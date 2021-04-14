import Joi from 'joi'
import BaseValidator from './BaseValidator'

export default class UserValidator extends BaseValidator {
  // 注册校验
  register () {
    return this.validator(Joi.object({
      nickname: Joi.string().min(6).max(30).required(),
      username: Joi.string().min(6).max(30).required(),
      password: Joi.string().max(30).required()
    }))
  }
}
