const nodemailer = require('nodemailer')
const { user, pass } = require('../../config/keys')
const dayjs = require('dayjs')

async function mail(ctx) {
  let targetAddress = ctx.request.body.email
  let code = ctx.request.code
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com',
    secure: true, // true for 465, false for other ports
    auth: {
      user, // generated ethereal user
      pass, // generated ethereal password
    },
  })

  let mailOptions = {
    from: '"旅书" <lvshu@yuusheng.cn>', // sender address
    to: targetAddress, // list of receivers

    // Subject of the message
    subject: '邮箱验证 ' + dayjs(new Date()).format('YYYY-MM-DD h:m'),

    // HTML body
    html: `<p><b>你好，欢迎来到旅书</b></p>
   <p>你的代码：${code}</p>`,
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  })
}

module.exports = mail
