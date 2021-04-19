/**
 * 取值
 * @param value {*} 需要取得内容
 * @param def {*} 默认值
 * @return {*}  如果 value 是 undefined, 则返回 def
 * **/
export function getValue (value, def) {
  return value !== undefined ? value : def
}

/**
 * 设置 ctx.body
 * @param ctx {*} ctx上下文
 * @param value {Object} 设置的内容
 * **/
export function mergeBody (ctx, value) {
  ctx.body = ctx.body || {}
  Object.assign(ctx.body, value)
}

/**
 * 过滤属性
 * @param origin {Object} 原数据
 * @param keys {Array} 属性列表
 * @return {Object} 仅包含 keys 的 object
 * **/
export function attrs (origin, keys) {
  return keys.reduce((data, key) => Object.assign(data, { [key]: origin[key] }), {})
}

/**
 * timestamp
 * @return {Number} 时间戳 秒
 * **/
export function timestamp () {
  return Math.round(+new Date() / 1000)
}

/**
 * 转为JSON文本
 * @param value {*} 原数据
 * @return {String} JSON文本
 * **/
export function jsonStringify (value) {
  return typeof value === 'string' ? value : JSON.stringify(value)
}

/**
 * 序列化JSON文本
 * @param value {String} JSON文本
 * @return {*} 原数据
 * **/
export function jsonParse (value) {
  let val = null
  try {
    val = JSON.parse(value)
  } catch (e) {}
  return val
}
