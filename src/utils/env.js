const env = process.env.NODE_ENV || 'development'

export default env

export function isDevelop () {
  return env === 'development'
}
