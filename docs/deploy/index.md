---
tetle: #部署教程
prev: false
next: false
sidebar: false
---

# **部署说明**

## **部署教程**

1. **导入docker-compose.yml文件**
    <details>
    <summary>点击查看</summary>

    ```
    version: '3.8'

    services:
      rix-api:
        image: rixapi/rixapi:latest
        # build: .
        container_name: rix-api
        restart: always
        command: --log-dir /app/logs
        ports:
          - "3009:3000"
        volumes:
          - ./data:/data
          - ./logs:/app/logs
        environment:
          - SQL_DSN=rixapi:rixapipassword@tcp(mysql:3306)/rixapi
          - REDIS_CONN_STRING=redis://redis
          - SESSION_SECRET=RixpO13HJsfKHD  # 修改为随机字符串
          - SYNC_FREQUENCY=30
          - BATCH_UPDATE_ENABLED=true
          - GLOBAL_API_RATE_LIMIT=1000000
          - TZ=Asia/Shanghai
    #      - NODE_TYPE=slave  # 多机部署时从节点取消注释该行
    #      - SYNC_FREQUENCY=60  # 需要定期从数据库加载数据时取消注释该行

        depends_on:
          - redis
          - mysql
        networks:
          - default

      mysql:
        image: mysql:8.0
        volumes:
          - /data/mysql/data:/var/lib/mysql
          - /data/mysql/conf:/etc/mysql/conf.d
          - /data/mysql/init:/docker-entrypoint-initdb.d
          - /etc/localtime:/etc/localtime:ro
        restart: always
        environment:
          - MYSQL_ROOT_PASSWORD=rixapirootpassword
          - MYSQL_DATABASE=rixapi
          - MYSQL_USER=rixapi
          - MYSQL_PASSWORD=rixapipassword
        networks:
          - default 

      redis:
        image: redis:latest
        container_name: redis
        restart: always
        volumes:
          - /data/redis/data:/data
          - /data/redis/redis.conf:/usr/local/etc/redis/redis.conf 
          - /etc/localtime:/etc/localtime:ro
        command: redis-server /usr/local/etc/redis/redis.conf 
        networks:
          - default 

    networks:
      default: 

    ```
    </details>

2. **修改environment环境变量（可参照one-api的环境变量）**

3. 
    ```
    docker-compose pull && docker-compose up -d
    ```

**注意事项**
   - 需使用mysql和redis
   - 反代配置里：proxy_set_header Host $host;
   - 如果无法下载，请手动复制

## **更新教程**

1. **进入设置页，如有新版本，会提示版本号。**

2. **在docker-compose.yml文件里修改镜像版本，如：rixapi/rixapi:0.2.10 或 rixapi/rixapi:latest**

3. **更新并重新部署**
    ```
    docker-compose pull && docker-compose up -d
    ```

## **常见问题**

  <details>
  <summary>Uptime Kuma部署怎么嵌入</summary>
  环境变量添加：UPTIME_KUMA_DISABLE_FRAME_SAMEORIGIN=1
  </details>

  <details>
  <summary>模型列表没有模型/价格</summary>
  需要先在后台配置分组倍率、供应商和模型信息；
  </details>

  <details>
  <summary>安装Docker</summary>

  ### **安装Docker和docker-compose**

  ```
  curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
  ```
      
  ```
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
  docker-compose --version
  ```
  </details>

  <details>
  <summary>端口转发</summary>

  ```
  bash <(curl -fsSL https://www.arloor.com/sh/iptablesUtils/natcfg.sh)
  ```
  </details>