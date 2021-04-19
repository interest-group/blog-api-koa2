import config from 'config'
import jsonwebtoken from 'jsonwebtoken'
import { getRedis, setRedis } from './redis'
import { timestamp } from '../utils/tools'

export default class Authorization {
  // 签发
  sign ({ id, username, nickname, role }) {
    return jsonwebtoken.sign({ id, username, nickname, role }, config.get('jwtConfig.secretKey'), {
      expiresIn: config.get('jwtConfig.expiresIn')
    })
  }

  // 续签 tokenValue
  renewal (tokenValue) {
    // 当前时间
    const time = timestamp()
    // 超过续签时间 且 在有效期内
    if (time > tokenValue.iat + config.get('jwtConfig.renewal') && tokenValue.exp > time) {
      return this.sign(tokenValue)
    }
  }

  // 撤销当前令牌 tokenValue
  // 当前令牌加入黑名单
  async revoke (tokenValue) {
    const block = await this.getRedisBlock(tokenValue.id)
    if (!block.revoked.includes(tokenValue.iat)) {
      block.revoked.push(tokenValue.iat)
      await this.setRedisBlock(tokenValue.id, block)
    }
  }

  // 撤销用户所有令牌 tokenValue
  // 更新重签时间
  async revokeAll (tokenValue) {
    const block = await this.getRedisBlock(tokenValue.id)
    block.time = timestamp()
    await this.setRedisBlock(tokenValue.id, block)
  }

  // 检查是否失效
  async isRevoked (ctx, data) {
    const block = await this.getRedisBlock(data.id)
    return (block.time && data.iat < block.time) || block.revoked.includes(data.iat)
  }

  // 获取黑名单
  async getRedisBlock (id) {
    return getRedis(`block_token_${id}`, { time: 0, revoked: [] })
  }

  // 保存黑名单
  async setRedisBlock (id, value) {
    return setRedis(`block_token_${id}`, value, config.get('jwtConfig.expiresIn'))
  }
}

// koa-jwt 配置项
export function middlewareOptions () {
  const authorization = new Authorization()
  return {
    secret: config.get('jwtConfig.secretKey'),
    isRevoked: authorization.isRevoked.bind(authorization),
    passthrough: true
  }
}
