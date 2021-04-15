import jsonwebtoken from 'jsonwebtoken'
import config from '../config/authorization'

export default class Authorization {
  // 签发
  sign ({ id, username, nickname }) {
    return jsonwebtoken.sign({ id, username, nickname }, config.secretKey, { expiresIn: config.expiresIn })
  }

  // 续签
  renewal (data) {
    // 当前时间
    const time = Math.round(+new Date() / 1000)
    // 超过续签时间 且 在有效期内
    if (time > data.iat + config.renewal && data.exp > time) {
      return this.sign(data)
    }
  }
}
