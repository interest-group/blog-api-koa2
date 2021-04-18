// 取值
// 如果是 undefined 则取 def
export function getValue (value, def) {
  return value !== undefined ? value : def
}

// 设置 ctx.body
export function mergeBody (ctx, value) {
  ctx.body = ctx.body || {}
  Object.assign(ctx.body, value)
}

// 时间戳 秒
export function timestamp () {
  return Math.round(+new Date() / 1000)
}

// JSON.stringify
export function jsonStringify (value) {
  return typeof value === 'string' ? value : JSON.stringify(value)
}

// JSON.parse
export function jsonParse (value) {
  let val = null
  try {
    val = JSON.parse(value)
  } catch (e) {}
  return val
}
