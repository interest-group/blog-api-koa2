// 取值
// 如果是 undefined 则取 def
export function getValue (value, def) {
  return value !== undefined ? value : def
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
