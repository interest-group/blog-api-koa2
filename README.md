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


"dayjs": "^1.10.4",
    "joi": "^17.4.0",
    "koa": "^2.7.0",
    "koa-body": "^4.2.0",
    "koa-json": "^2.0.2",
    "koa-jwt": "^4.0.1",
    "koa-logger": "^3.2.0",
    "koa-onerror": "^4.1.0",
    "koa-router": "^7.4.0",
    "koa-static2": "^0.1.8",
    "mysql2": "^2.2.5",
    "require-directory": "^2.1.1",
    "sequelize": "^6.6.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.13.14",
    "@babel/core": "^7.13.15",
    "@babel/node": "^7.13.13",
    "@babel/plugin-transform-runtime": "^7.13.15",
    "@babel/preset-env": "^7.13.15",
    "@babel/register": "^7.13.14",
    "@babel/runtime": "^7.13.10",
    "eslint-config-standard": "^14.1.1",
    "eslint-friendly-formatter": "^4.0.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^5.1.0",
    "eslint-plugin-standard": "^5.0.0",
    "gulp": "^4.0.2",
    "gulp-eslint": "^6.0.0",
    "gulp-nodemon": "^2.5.0"
    
**koa2**: HTTP 框架
&nbsp;From: https://github.com/koajs/koa v2

**koa-body**: body 解析器  
&nbsp;From: https://github.com/dlau/koa-body

**koa-router**: Koa 路由  
&nbsp;From: https://github.com/alexmingoia/koa-router/tree/master/
