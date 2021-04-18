import Joi from 'joi'
import Exception from '../core/Exception'

export default class BaseValidator {
  constructor (ctx) {
    this.ctx = ctx
  }

  string (min, max, isRequired) {
    const schema = Joi.string().min(min).max(max)
    return isRequired ? schema.required() : schema
  }

  validator (schema, data) {
    const inputs = data || this.ctx.request.body
    const { value, error } = schema.validate(inputs)
    if (error) {
      throw new Exception({ status: 415, data: null, message: error.message })
    }
    return value
  }
}
