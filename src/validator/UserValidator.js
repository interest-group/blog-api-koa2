import Joi from 'joi'
import BaseValidator from './BaseValidator'

export default class UserValidator extends BaseValidator {
  // 注册校验
  register () {
    return this.validator(Joi.object({
      nickname: this.string(4, 30),
      username: this.string(4, 30),
      password: this.string(4, 30)
    }))
  }

  // 登录校验
  login () {
    return this.validator(Joi.object({
      username: this.string(4, 30),
      password: this.string(4, 30)
    }))
  }

  // 更新密码校验
  updatePassword () {
    return this.validator(Joi.object({
      username: this.string(4, 30),
      password: this.string(4, 30),
      newPassword: this.string(4, 30)
    }))
  }
}
