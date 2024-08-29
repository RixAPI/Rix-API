---
tetle: #部署教程
prev: false
next: false
sidebar: false
---

# **部署说明**

## **部署教程**

1. **下载docker-compose.yml文件**
    [点击下载](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/KB3JbAFxqolacqx643Ac6PbTn1g/?mount_node_token=YW9GdKOUXotOfcxmR6Dcw2GGnCg&mount_point=docx_file)

2. **修改environment环境变量（可参照one-api的环境变量）**

3. 
    ```
    docker-compose pull && docker-compose up -d
    ```

**注意事项**
   - 需使用mysql和redis
   - 反代配置里：proxy_set_header Host $host;
   - 如果无法下载，请手动复制

---

## **更新教程**

1. **进入设置页，如有新版本，会提示版本号。**

2. **在docker-compose.yml文件里修改镜像版本，如：rixapi/rixapi:0.2.10 或 rixapi/rixapi:latest**

3. **更新并重新部署**
    ```
    docker-compose pull && docker-compose up -d
    ```

---

## **工具（不是安装指令）**

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

### **端口转发**

```
bash <(curl -fsSL https://www.arloor.com/sh/iptablesUtils/natcfg.sh)
```

---
