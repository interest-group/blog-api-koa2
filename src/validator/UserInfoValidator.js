import Joi from 'joi'
import BaseValidator from './BaseValidator'

export default class UserInfoValidator extends BaseValidator {
  // 注册
  register () {
    return this.validator(Joi.object({
      nickname: this.string(30).min(2),
      username: this.string(30).min(4),
      password: this.string(30).min(4)
    }))
  }

  // 登录校验
  login () {
    return this.validator(Joi.object({
      username: this.string(30).min(4),
      password: this.string(30).min(4)
    }))
  }

  // 更新密码校验
  updatePassword () {
    return this.validator(Joi.object({
      password: this.string(30).min(4),
      newPassword: this.string(30).min(4)
    }))
  }
}
