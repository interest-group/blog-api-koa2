import path from 'path'
export default {
  uploadDir: path.join(__dirname, '../../resources/uploads'),
  resourcePath: '/resources/uploads/',
  qiniuZone: 'Zone_z2',
  qiniuBucket: 'blog-node',
  qiniuExpires: 60 * 60, // 秒
  qiniuAccessKey: '',
  qiniuSecretKey: '',
  qiniuHost: 'http://qrr4je1jj.hn-bkt.clouddn.com/'
}
