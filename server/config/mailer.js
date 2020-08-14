const nodeMailer = require("nodemailer");

let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let mailHost = process.env.MAIL_HOST;
let mailPort = process.env.MAIL_PORT;

let sendMail = (to, subject, htmlContent) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use SSl - TLS
    auth: {
      user: "quanlyahoochat9999@gmail.com",
      pass: "sealp[ple",
    },
  });

  let options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(options); // this default return
};

module.exports = sendMail;
