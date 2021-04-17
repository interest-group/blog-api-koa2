# blog-api-koa2
基于koa2 的博客api项目

## 准备工具

### 获取代码

```bash
git clone https://github.com/interest-group/blog-api-koa2.git

cd mv blog-api-koa2

npm install
```

### mysql

- 安装并启动 `mysql`。

- 创建 `blog` 数据库。

```
# 登录数据库
$ mysql -uroot -p密码

# 创建 boblog 数据库
$ CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- 修改数据库配置项。

``` js
// ./src/config/database.js

export default {
  host: 'localhost',
  port: 3306,
  database: 'blog',
  username: 'root',
  password: 'root'
}
```

### redis

- 安装并启动 `redis`。

- 修改 `redis` 配置项。

```
// ./src/config/redis.js

export default {
  host: 'localhost',
  port: 6379,
  password: ''
}
```

## 启动项目

```bash
npm run dev
```

访问： [http://localhost:5220/](http://localhost:5220/)

## 生产环境部署

### 安装pm2

```bash
npm install pm2 -g
```

### 利用pm2启动

```bash
npm run build

npm run start 
```

## 主要插件介绍


### koa

- `koa`
 
  web开发框架
  
  From: [https://github.com/koajs/koa](https://github.com/koajs/koa)
  
- `koa-static2`
 
  koa静态资源中间件
  
  From: [https://github.com/Secbone/koa-static2](https://github.com/Secbone/koa-static2)

- `koa-router`
 
  koa路由中间件
  
  From: [https://github.com/koajs/router](https://github.com/koajs/router)

- `koa-body`
 
  body解析中间件
  
  From: [https://github.com/dlau/koa-body](https://github.com/dlau/koa-body)
  
- `koa-logger`
 
  日志输出中间件
  
  From: [https://github.com/koajs/logger](https://github.com/koajs/logger)
  
- `koa-jwt`
 
  jwt解析中间件
  
  From: [https://github.com/koajs/jwt](https://github.com/koajs/jwt)
  
### 加密/校验
  
- `jsonwebtoken`
 
  jwt生成/校验
  
  From: [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  
- `bcryptjs`
 
  加密工具
  
  From: [https://github.com/dcodeIO/bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
  
- `joi`
 
  参数校验工具
  
  From: [https://github.com/sideway/joi](https://github.com/sideway/joi)
  
### 数据库
  
- `ioredis`
 
  redis数据库
  
  From: [https://github.com/luin/ioredis](https://github.com/luin/ioredis)
  
- `mysql2`
 
  mysql数据库
  
  From: [https://github.com/sidorares/node-mysql2](https://github.com/sidorares/node-mysql2)
  
- `sequelize`
 
  数据库ORM工具
  
  From: [https://github.com/sequelize/sequelize](https://github.com/sequelize/sequelize)
  
- `cls-hooked`
 
  sequelize事务
  
  From: [https://github.com/jeff-lewis/cls-hooked](https://github.com/jeff-lewis/cls-hooked)

  
### gulp
  
- `gulp`
 
  自动化构建工具
  
  From: [https://github.com/gulpjs/gulp](https://github.com/gulpjs/gulp)
  
- `gulp-nodemon`
 
  修改JS自动重启
  
  From: [https://github.com/JacksonGariety/gulp-nodemon](https://github.com/JacksonGariety/gulp-nodemon)
  
- `gulp-eslint`
 
  gulp的ESLint检查插件
  
  From: [https://github.com/adametry/gulp-eslint](github.com/adametry/gulp-eslint)

  
### eslint
  
- `eslint-friendly-formatter`
 
  使得ESlint提示更友好
  
  From: [https://github.com/royriojas/eslint-friendly-formatter](https://github.com/royriojas/eslint-friendly-formatter)
  
- `eslint-config-standard`
 
  ESlint Standard 配置（高版本与 `gulp-eslint` 有冲突，这里使用@14.1.1）
  
  From: [https://github.com/standard/eslint-config-standard](https://github.com/standard/eslint-config-standard)
  
- `eslint-plugin-standard`
 
  ESlint Standard 配置插件
  
  From: [https://github.com/standard/eslint-config-standard](https://github.com/standard/eslint-config-standard)
  
- `eslint-plugin-import`
 
  检查 import/export
  
  From: [https://github.com/benmosher/eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
  
- `eslint-plugin-promise`
 
  检查 JavaScript promises
  
  From: [https://github.com/xjamundx/eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
  
- `eslint-plugin-node`
 
  检查 Node.js 规则
  
  From: [https://github.com/mysticatea/eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)
  
  
### babel


- `@babel/core`
 
  Babel编译器核心
  
  From: [https://babel.dev/docs/en/next/babel-core](https://babel.dev/docs/en/next/babel-core)

- `@babel/cli`
 
  Babel命令行工具
  
  From: [https://babel.dev/docs/en/next/babel-cli](https://babel.dev/docs/en/next/babel-cli)

- `@babel/register`
 
  Babel运行时编译
  
  From: [https://babel.dev/docs/en/next/babel-register](https://babel.dev/docs/en/next/babel-register)

- `@babel/preset-env`
 
  Babel预设
  
  From: [https://babel.dev/docs/en/next/babel-preset-env](https://babel.dev/docs/en/next/babel-preset-env)

- `@babel/plugin-transform-runtime`
 
  babel-runtime 工具
  
  From: [https://babel.dev/docs/en/next/babel-plugin-transform-runtime](https://babel.dev/docs/en/next/babel-plugin-transform-runtime)
