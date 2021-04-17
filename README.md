# blog-api-koa2
基于koa2 的博客api项目

### 数据库
1. 创建 `blog` 数据库
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 boblog 数据库
$ CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 修改数据库配置项

```
文件 ./src/config.js

database: {
    host: 'localhost',
    port: 3306,
    database: 'blog',
    username: 'root',
    password: ''
}
```

### 启动项目

```bash
git clone https://github.com/interest-group/blog-api-koa2.git

cd mv blog-api-koa2
npm install
npm run dev
```

访问： http://127.0.0.1:5220/

## 生产环境部署

生成 node 直接可以执行的代码到 dist 目录：

```bash
npm run build

npm run start # 使用pm2启动
```

## 引入插件介绍

**koa2**: HTTP 框架
&nbsp;From: https://github.com/koajs/koa v2

**koa-body**: body 解析器  
&nbsp;From: https://github.com/dlau/koa-body

**koa-router**: Koa 路由  
&nbsp;From: https://github.com/alexmingoia/koa-router/tree/master/
