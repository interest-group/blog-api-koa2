import BaseValidator from './BaseValidator'
import Joi from 'joi'

export default class SystemValidator extends BaseValidator {
  configuration () {
    return this.validator(Joi.object({
      pageIndex: this.integer(1, true),
      pageSize: this.integer(10, true)
    }), this.ctx.query)
  }
}
