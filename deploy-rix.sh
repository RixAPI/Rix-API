#!/bin/bash
set -e

usage() {
    echo "用法: $0 [up|down]"
    echo "  up    部署/更新服务组"
    echo "  down  停止并移除服务组"
    exit 1
}

if [ $# -ne 1 ]; then
    usage
fi

ACTION="$1"

echo "---------------------------------------"
read -p "请输入本服务组名称（建议英文/数字，无空格。例如 yanshi、test1、prod）: " GROUP_NAME
if [ -z "$GROUP_NAME" ]; then
    echo "组名不能为空！"
    exit 1
fi
echo "---------------------------------------"

COMPOSE_FILE="docker-compose-${GROUP_NAME}.yml"

# 架构选择
echo "请选择部署架构:"
echo "1) amd64/x86_64 (主流服务器/PC)"
echo "2) arm64        (如树莓派、部分国产ARM服务器)"
while true; do
    read -p "输入选项 [1/2]，默认 1: " ARCH_OPT
    ARCH_OPT=${ARCH_OPT:-1}
    if [[ "$ARCH_OPT" == "1" ]]; then
        IMAGE="rixapi/rixapi-2:latest"
        break
    elif [[ "$ARCH_OPT" == "2" ]]; then
        IMAGE="rixapi/rixapi-2-arm64:latest"
        break
    else
        echo "无效选项，请输入1或2。"
    fi
done
echo "镜像已选择：$IMAGE"
echo "---------------------------------------"

# 检查docker compose命令
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose -f $COMPOSE_FILE"
elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose -f $COMPOSE_FILE"
else
    echo "docker-compose 未安装。请先安装 Docker Compose。" >&2
    exit 1
fi

if [ "$ACTION" = "down" ]; then
    if [ ! -f "$COMPOSE_FILE" ]; then
        echo "未找到 $COMPOSE_FILE，无法停止该组"
        exit 1
    fi
    echo "停止并清理服务组 $GROUP_NAME..."
    $COMPOSE_CMD down
    echo "已停止。"
    exit 0
elif [ "$ACTION" != "up" ]; then
    usage
fi

# 选择端口
while true; do
    read -p "请输入API对外端口号（默认3099，按回车使用默认）: " PORT
    PORT=${PORT:-3099}
    if ! [[ "$PORT" =~ ^[0-9]+$ ]] || [ "$PORT" -lt 1024 ] || [ "$PORT" -gt 65535 ]; then
        echo "端口必须为1024~65535的数字！"
        continue
    fi
    # 检查端口是否被占用
    if ss -lnt | awk '{print $4}' | grep -E "[.:]$PORT$" > /dev/null ; then
        echo "端口 $PORT 已被占用，请换一个！"
        continue
    fi
    break
done

echo "---------------------------------------"

# 生成 docker-compose 文件
cat > "$COMPOSE_FILE" <<EOF
version: '3.8'
services:
  rix-api-${GROUP_NAME}:
    image: ${IMAGE}
    container_name: rix-api-${GROUP_NAME}
    restart: always
    command: --log-dir /app/logs
    ports:
      - "${PORT}:3009"
    volumes:
      - ./data-${GROUP_NAME}:/data
      - ./logs-${GROUP_NAME}:/app/logs
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - ALLOW_MULTI_LOGIN_ENABLED=true
      - IMAGE_NAME=${IMAGE}
      - SQL_DSN=${GROUP_NAME}:rixapipassword@tcp(mysql-${GROUP_NAME}:3306)/${GROUP_NAME}
      - REDIS_CONN_STRING=redis://redis-${GROUP_NAME}/4
      - SESSION_SECRET=RixpOdd13HJsfKHD
      - SYNC_FREQUENCY=30
      - BATCH_UPDATE_ENABLED=true
      - GLOBAL_API_RATE_LIMIT=1000000
      - TZ=Asia/Shanghai
    depends_on:
      - redis-${GROUP_NAME}
      - mysql-${GROUP_NAME}
    networks:
      - ${GROUP_NAME}-net
  mysql-${GROUP_NAME}:
    image: mysql:8.0
    container_name: mysql-${GROUP_NAME}
    volumes:
      - /data/mysql/data-${GROUP_NAME}:/var/lib/mysql
      - /data/mysql/conf-${GROUP_NAME}:/etc/mysql/conf.d
      - /data/mysql/init-${GROUP_NAME}:/docker-entrypoint-initdb.d
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=rixapirootpassword
      - MYSQL_DATABASE=${GROUP_NAME}
      - MYSQL_USER=${GROUP_NAME}
      - MYSQL_PASSWORD=rixapipassword
    networks:
      - ${GROUP_NAME}-net
  redis-${GROUP_NAME}:
    image: redis:latest
    container_name: redis-${GROUP_NAME}
    restart: always
    volumes:
      - /data/redis/data-${GROUP_NAME}:/data
      - /data/redis/redis-${GROUP_NAME}.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    networks:
      - ${GROUP_NAME}-net
networks:
  ${GROUP_NAME}-net:
EOF

echo "$COMPOSE_FILE 已生成."
echo "---------------------------------------"

echo "拉取最新镜像..."
$COMPOSE_CMD pull

echo "下线旧服务(不存在则跳过)..."
$COMPOSE_CMD down

echo "启动服务..."
$COMPOSE_CMD up -d

echo "已部署，服务状态如下："
$COMPOSE_CMD ps
