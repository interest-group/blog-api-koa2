import Joi from 'joi'
import BaseValidator from './BaseValidator'

export default class FileValidator extends BaseValidator {
  // 注册校验
  file () {
    return this.validator(Joi.object({
      file: Joi.custom((value, helpers) => {
        return (value && value.name && value.size) ? value : helpers.error('any.invalid')
      }).required()
    }), 'files')
  }
}
