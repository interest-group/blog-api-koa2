import Joi from 'joi'
import Exception from '../core/Exception'

export default class BaseValidator {
  constructor (ctx) {
    this.ctx = ctx
  }

  string (min, max) {
    return Joi.string().min(min).max(max).required()
  }

  validator (schema) {
    const inputs = this.ctx.request.body
    const { value, error } = schema.validate(inputs)
    if (error) {
      throw new Exception({ status: 415, data: null, message: error.message })
    }
    return value
  }
}
