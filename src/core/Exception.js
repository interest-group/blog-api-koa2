import { getValue } from '../utils/tools'

export default class Exception extends Error {
  constructor ({ status, data, message }) {
    super()
    this.message = getValue(message, 'operation failed.')
    this.data = getValue(data, null)
    this.status = status || 400
  }
}
