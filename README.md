# Docker PocketBase 示例

这个项目展示了如何使用 Docker 来运行 [PocketBase](https://pocketbase.io/) 数据库和后端服务。

## 功能特点

- 使用 Docker 容器化部署 PocketBase
- 通过环境变量可配置管理员账号信息
- 包含数据自动初始化功能
- 预置了作者(authors)和文章(posts)两个集合，posts 集合中的每条记录都通过外键关联到 authors 集合
- 包含示例数据

## 快速开始

1. 克隆此仓库:

   ```bash
   git clone <current-repo-url>
   cd pocketbase-demo
   ```

2. 启动服务:

   ```bash
   docker-compose up -d
   ```

   这个命令会自动构建镜像并在后台启动容器。

3. 访问管理界面:
   打开浏览器访问 http://localhost:8090/\_/

4. 终止运行并重新构建镜像:

   如果需要重新构建镜像并重新初始化数据,可以执行以下命令:

   ```bash
   docker-compose down
   rm -rf ./pb_data
   docker-compose build --no-cache
   docker-compose up
   ```

   这将会:

   - 停止容器
   - 删除本地数据
   - 强制重新构建镜像
   - 重新启动服务

## 环境变量

可以通过环境变量配置管理员账号:

- `ADMIN_EMAIL`: 管理员邮箱 (默认: your-custom-email@example.com)
- `ADMIN_PASSWORD`: 管理员密码 (默认: your-secure-password123)

## 预置数据

系统初始化时会创建以下数据:

### 作者集合

- George Orwell
- Jane Austen
- Ernest Hemingway
- Virginia Woolf

### 文章集合

- 1984 (George Orwell)
- Animal Farm (George Orwell)
- Pride and Prejudice (Jane Austen)
- The Old Man and the Sea (Ernest Hemingway)
- Mrs. Dalloway (Virginia Woolf)

## API 访问

PocketBase 提供了 RESTful API，可以通过以下端点访问数据:

- 作者列表: `GET http://localhost:8090/api/collections/authors/records`
- 文章列表: `GET http://localhost:8090/api/collections/posts/records`

## 许可证

MIT
