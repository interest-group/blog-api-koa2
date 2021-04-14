export default class Exception extends Error {
  constructor (message, status) {
    super()
    this.status = status || 400
    this.message = message
  }
}
