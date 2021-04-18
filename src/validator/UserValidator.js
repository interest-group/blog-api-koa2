import Joi from 'joi'
import BaseValidator from './BaseValidator'

export default class UserValidator extends BaseValidator {
  // 注册校验
  register () {
    return this.validator(Joi.object({
      nickname: this.string(2, 30, true),
      username: this.string(4, 30, true),
      password: this.string(4, 30, true)
    }))
  }

  // 登录校验
  login () {
    return this.validator(Joi.object({
      username: this.string(4, 30, true),
      password: this.string(4, 30, true)
    }))
  }

  // 更新密码校验
  updatePassword () {
    return this.validator(Joi.object({
      password: this.string(4, 30, true),
      newPassword: this.string(4, 30, true)
    }))
  }
}
