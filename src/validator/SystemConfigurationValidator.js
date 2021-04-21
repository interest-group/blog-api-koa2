import BaseValidator from './BaseValidator'
import Joi from 'joi'

export default class SystemConfigurationValidator extends BaseValidator {
  // 配置项
  configuration () {
    return this.validator(Joi.object({
      type: this.integer(),
      name: this.string(100),
      value: this.string(100),
      describe: Joi.string().allow('').required()
    }))
  }
}
