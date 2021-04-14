import Exception from '../core/Exception'
export default class BaseValidator {
  constructor (ctx) {
    this.ctx = ctx
  }

  async validator (schema) {
    const inputs = this.ctx.request.body
    const { value, error } = schema.validate(inputs)
    if (error) {
      throw new Exception(error.message, 415)
    }
    return value
  }
}
