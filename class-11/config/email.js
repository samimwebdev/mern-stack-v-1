const nodemailer = require('nodemailer')

//smtp (mailtrap)

//abc@gmail.com- mailtrap(trapping)- bcd@gmail.com
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

module.exports = { transporter }
