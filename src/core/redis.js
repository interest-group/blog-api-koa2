import IoRedis from 'ioredis'
import config from '../config/redis'
import { jsonParse, jsonStringify } from '../utils/tools'

const redis = new IoRedis(config)

redis.on('connect', () => {
  console.log('redis connection success.')
})
redis.on('error', (err) => {
  console.log('redis connection error.')
  console.log(err)
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
