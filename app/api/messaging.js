require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');
const dbOps    = require('./dbOps');
const emailTemplates = require('./../libs/EmailTemplate.js')

let htmlBody;


const transporter = nodemailer.createTransport({
    service: 'gmail', 
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.APP_PASS,
    }
});

//Create email body
const createBody = async(client) => {
  htmlBody = '<div><p>'+client.firstname+'</p><p>'+client.lastname+'</p><p>'+client.companyname+'</p><p>'+client.email+'</p><p>'+client.phone+'</p></div>';
  return htmlBody;
}

// Generic function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    dbOps.logSiteError(err);
    console.error(`Error sending email: ${err.message}`);
  }
};

const sendQouteMail = (emailTo) => sendEmail(emailTo, 'Your service quote', 'Your service quote has been received', emailTemplates.quoteEmailBody);

const sendConHelpMail = (emailTo, recipient) => sendEmail(emailTo, 'Your request for assistance', 'We have received your request for assistance', emailTemplates.conEmailBody(recipient));

const sendCrspEmail = (emailTo, mssgParams, qouteId, type) => sendEmail(emailTo, `Project Inquiry Information ${type}: #${qouteId}`, 'Project Inquiry Details', emailTemplates.crspEmailBody(mssgParams, qouteId, type));

const sendCrspEmailAssist = (emailTo, mssgParams, senderName) => sendEmail(emailTo, `Assistance request - ${senderName}`, 'Assistance request details', emailTemplates.crspEmailAssistBody(mssgParams, senderName));

const sendPassReset = (emailTo) => {
  const resetPasswordLink = `http://localhost:4000/api/passreset?email=${emailTo}`;
  const htmlBody = `<p>Hello,</p><p>Please click on the following link to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>`;
  return sendEmail(emailTo, 'Password Reset', 'You have requested to reset your password.', htmlBody);
};

module.exports = {
  createBody,
  sendQouteMail,
  sendConHelpMail,
  sendPassReset,
  sendEmailToCompAccount
};
