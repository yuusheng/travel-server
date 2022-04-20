const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.exmail.qq.com',
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'lvshu@yuusheng.cn', // generated ethereal user
    pass: 'MukzszdXTBznPQdT', // generated ethereal password
  },
})

let mailOptions = {
  from: '"旅书" <lvshu@yuusheng.cn>', // sender address
  to: 'contact@yuusheng.cn', // list of receivers

  // Subject of the message
  subject: '邮箱验证 ✔' + Date.now(),

  // plaintext body
  // text: 'Hello to myself!',

  // HTML body
  html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
   <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>`,

  // // AMP4EMAIL
  // amp: `<!doctype html>
  //  <html ⚡4email>
  //    <head>
  //      <meta charset="utf-8">
  //      <style amp4email-boilerplate>body{visibility:hidden}</style>
  //      <script async src="https://cdn.ampproject.org/v0.js"></script>
  //      <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
  //    </head>
  //    <body>
  //      <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>

  //    </body>
  //  </html>`,

  // An array of attachments（附件）
  attachments: [
    // String attachment
    // {
    //   filename: 'notes.txt',
    //   content: 'Some notes about this e-mail',
    //   contentType: 'text/plain', // optional, would be detected from the filename
    // },

    // Binary Buffer attachment
    {
      filename: 'image.png',
      content: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
          '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
          'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        'base64'
      ),

      cid: 'note@example.com', // should be as unique as possible
    },

    // File Stream attachment
    // {
    //   filename: 'rainbow cat ✔.jpg',
    //   path: __dirname + '/rainbow.jpg',
    //   cid: 'nyan@example.com', // should be as unique as possible
    // },
  ],
}

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error)
  }
  console.log('Message sent: %s', info.messageId)
  // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
})

// // send mail with defined transport object
// let info = await transporter.sendMail({
//   from: '"Fred Foo 👻" <foo@example.com>', // sender address
//   to: 'bar@example.com, baz@example.com', // list of receivers
//   subject: 'Hello ✔', // Subject line
//   text: 'Hello world?', // plain text body
//   html: '<b>Hello world?</b>', // html body
// })

// console.log('Message sent: %s', info.messageId)
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
// // next()
