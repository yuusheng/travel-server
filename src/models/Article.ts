import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  // 标题
  title: { type: String, required: true, validate: /\S+/ },

  // 关键词
  // todo seo
  keywords: [{ type: String, default: '' }],

  // 作者
  author: { type: String, ref: 'users', required: true, validate: /\S+/ },

  // 描述
  desc: { type: String, default: '' },

  // 内容
  content: { type: String, required: true, validate: /\S+/ },

  // 字数
  numbers: { type: String, required: true, default: '0' },

  // 发布状态：0草稿， 1已发布
  state: { type: Number, default: 1 },

  // 标签
  tags: [{ type: String, ref: 'tag' }],

  // comments: [{type: String, }]

  // 点赞用户
  like_users: [
    {
      id: {
        type: String,
        ref: 'users',
        create_time: { type: Date, default: Date.now },
      },
      name: String,
      avatar: { type: String },
      create_time: { type: String, default: Date.now },
    },
  ],

  dislike_users: [
    {
      id: {
        type: String,
        ref: 'users',
        create_time: { type: Date, default: Date.now },
      },
      create_time: { type: String, default: Date.now },
    },
  ],

  // 其他元信息
  meta: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },

  // 创建日期
  create_time: { type: Date, default: Date.now },

  // 更新日期
  update_time: { type: Date, default: Date.now },
})

export const Article = mongoose.model('article', articleSchema)
