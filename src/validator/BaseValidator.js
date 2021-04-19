import Joi from 'joi'
import Exception from '../core/Exception'

export default class BaseValidator {
  constructor (ctx) {
    this.ctx = ctx
  }

  /**
   * params.id
   * **/
  paramsId () {
    return this.validator(Joi.object({
      id: Joi.number().integer().min(1)
    }), this.ctx.params)
  }

  // 整数
  integer (min, isRequired) {
    return this.required(Joi.number().integer().min(min), isRequired)
  }

  // 文本
  string (min, max, isRequired) {
    return this.required(Joi.string().min(min).max(max), isRequired)
  }

  // 必填项
  required (schema, isRequired) {
    return isRequired ? schema.required() : schema
  }

  /**
   * 校验
   * **/
  validator (schema, data) {
    const inputs = data || this.ctx.request.body
    const { value, error } = schema.validate(inputs)
    if (error) {
      throw new Exception({ status: 415, data: null, message: error.message })
    }
    return value
  }
}
