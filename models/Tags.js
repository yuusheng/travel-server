const mongoose = require('mongoose')

// 标签模型
const tagSchema = mongoose.Schema({
  // 标签名称
  name: { type: String, required: true, validate: /\S+/ },

  // 标签描述
  desc: String,

  // 发布日期
  create_time: { type: Date, default: Date.now },

  // 最后修改日期
  update_time: { type: Date, default: Date.now },
})

// 标签模型
module.exports = mongoose.model('tag', tagSchema)
