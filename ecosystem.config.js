module.exports = {
  apps: [
    {
      name: 'blog-api-koa2',
      exec_mode: 'cluster',
      instances: 2,
      script: './dist/app.js'
    }
  ]
}
