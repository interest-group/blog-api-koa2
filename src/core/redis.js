import config from 'config'
import IoRedis from 'ioredis'
import { jsonParse, jsonStringify } from '../utils/tools'

const redis = new IoRedis(config.get('redis'))

redis.on('connect', () => {
  console.log('redis connection success.')
})
redis.on('error', (error) => {
  console.log('redis connection fail:', error)
})

export default redis

// 从 redis 读取
export async function getRedis (key, def) {
  const value = await redis.get(key)
  return value ? jsonParse(value) : def
}

// 写入 redis 读取
export async function setRedis (key, value, time) {
  await redis.set(key, jsonStringify(value))
  if (time) {
    await redis.expire(key, time)
  }
}
