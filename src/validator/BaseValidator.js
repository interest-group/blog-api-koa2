import Joi from 'joi'
import Exception from '../core/Exception'

export default class BaseValidator {
  constructor (ctx) {
    this.ctx = ctx
  }

  /**
   * 通用参数
   * **/
  id (name) {
    return this.validator(Joi.object({
      id: this.integer()
    }), name)
  }

  // 查 配置项列表
  paginate (name) {
    return this.validator(Joi.object({
      pageIndex: this.integer(),
      pageSize: this.integer(10)
    }), name)
  }

  /**
   * 语法糖
   * **/
  // 整数
  integer (min) {
    return Joi.number().integer().min(min || 1).required()
  }

  // 文本
  string (max) {
    return Joi.string().max(max).required()
  }

  // 必填项
  required (schema, isRequired) {
    return isRequired ? schema.required() : schema
  }

  /**
   * 校验
   * **/
  // 校验方法
  validator (schema, name, options) {
    const inputs = this.getValidatorData(name || 'body')
    const { value, error } = schema.validate(inputs, options)
    if (error) {
      throw new Exception({ status: 415, data: null, message: error.message })
    }
    return value
  }

  // 获取校验的参数
  getValidatorData (name) {
    switch (name.toLowerCase()) {
      case 'params':
        return this.ctx.params
      case 'query':
        return this.ctx.query
      case 'files':
        return this.ctx.request.files
      case 'body':
        return this.ctx.request.body
    }
  }
}
