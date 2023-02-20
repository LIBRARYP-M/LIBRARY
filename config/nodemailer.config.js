const nodemailer = require("nodemailer")
const { generateRequestEmail } = require('./mailtemplate.config');
const { generateAcceptedEmail } = require("./acceptedMailTemplate.config");
const { generateRejectedEmail } = require("./rejectedMailTemplate.config");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const sendMail = (emailToSend, emailType, type, user, id) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: emailToSend,
    subject: `${type} request ${user.firstName}`,
    html: generateRequestEmail(type, user, id)
  }

  if(emailType === "request") {
    mailOptions.html = generateRequestEmail(type, user, id)
  } else if (emailType === "accepted") {
    mailOptions.html = generateAcceptedEmail(type, user, id)
    mailOptions.subject = `${type} accepted!`
  } else if (emailType === "rejected") {
    mailOptions.html = generateRejectedEmail(type, user, id)
    mailOptions.subject = `${type} request rejected`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}

module.exports = sendMail;