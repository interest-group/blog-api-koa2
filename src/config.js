export default {
  server: {
    port: 5220
  },
  database: {
    host: 'localhost',
    port: 3306,
    database: 'blog',
    username: 'root',
    password: 'root'
  },
  security: {
    secretKey: 'secretKey',
    // 过期时间 1小时
    expiresIn: 60 * 60
  }
}
