// Create a Nodemailer transporter using either SMTP or some other transport mechanism
// Set up message options (who sends what to whom)
// Deliver the message object using the sendMail() method of your previously created transporter

// need to pull in the users from user api

import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export async function sendCheckoutEmail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'st.ealmail.ing@gmail.com',
      pass: process.env.PASS, // .env for password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <clemskyn@gmail.com>', // sender address
    to: 'st.ealmail.ing@gmail.com', // list of receivers
    subject: 'Confirmation Email', // Subject line
    text: 'Your order is being shipped',
    html: '<b>Your order is being shipped</b>', // html body
  })

  console.log('Message sent: %s', info.messageId)
}

// sends email and catches error message if needed
// sendCheckoutEmail().catch(console.error)
