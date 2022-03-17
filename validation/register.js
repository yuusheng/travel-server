const Validator = require('validator')
const { isEmpty } = require('./tools')

module.exports = validateRegisterInput = (data) => {
  let errors = {}

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = '名字长度不能小于2位且不能超过30位'
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = '名字不能为空'
  }
  if (Validator.isEmpty(data.email)) {
    errors.name = '名字不能为空'
  }
  if (!Validator.isEmail(data.email)) {
    errors.name = '邮箱不合法'
  }
  if (Validator.isEmail(data.password)) {
    errors.name = '密码不能为空'
  }
  if (!Validator.isEmail(data.email)) {
    errors.name = '邮箱不合法'
  }

  return { errors, isValid: isEmpty(errors) }
}
