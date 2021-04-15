export default {
  secretKey: 'blog-json-web-token',
  // 续签 2小时
  renewal: 2 * 60 * 60,
  // 过期 2天
  expiresIn: 2 * 24 * 60 * 60
}
