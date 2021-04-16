import jsonwebtoken from 'jsonwebtoken'
import md5 from 'js-md5'
import config from '../config/authorization'
import { getRedis, setRedis } from './redis'
import { timestamp } from '../utils/tools'

export default class Authorization {
  // 签发
  sign ({ id, username, nickname, role }) {
    // 生成 16位 tokenId
    const tid = md5(nickname + Math.random()).substr(8, 16)
    return jsonwebtoken.sign({ id, username, nickname, tid, role }, config.secretKey, { expiresIn: config.expiresIn })
  }

  // 续签 decodedToken
  renewal (data) {
    // 当前时间
    const time = timestamp()
    // 超过续签时间 且 在有效期内
    if (time > data.iat + config.renewal && data.exp > time) {
      return this.sign(data)
    }
  }

  // 撤销当前令牌 decodedToken
  // 当前令牌加入黑名单
  async revoke (data) {
    const block = await this.getRedisBlock(data.id)
    if (!block.revoked.includes(data.tid)) {
      block.revoked.push(data.tid)
      await this.setRedisBlock(data.id, block)
    }
  }

  // 撤销用户所有令牌 decodedToken
  // 更新重签时间
  async revokeAll (data) {
    const block = await this.getRedisBlock(data.id)
    block.time = timestamp()
    await this.setRedisBlock(data.id, block)
  }

  // 检查是否失效
  async isRevoked (ctx, data) {
    const block = await this.getRedisBlock(data.id)
    return (block.time && data.iat < block.time) || block.revoked.includes(data.tid)
  }

  // 获取黑名单
  async getRedisBlock (id) {
    return getRedis(`block_token_${id}`, { time: 0, revoked: [] })
  }

  // 保存黑名单
  async setRedisBlock (id, value) {
    return setRedis(`block_token_${id}`, value, config.expiresIn)
  }
}

// koa-jwt 配置项
export function getOptions () {
  const authorization = new Authorization()
  return {
    secret: config.secretKey,
    isRevoked: authorization.isRevoked.bind(authorization)
  }
}
