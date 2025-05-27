const { text } = require('express');
const nodemailer = require('nodemailer');

const sendEmail = async (option) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, 
    },
    tls: {
      rejectUnauthorized: false
  }
});

   
   const emailOptions = {
    from: 'DRONOVA<support@cineflix.com>',
    to: option.email,
    subject: option.subject,
    html: option.message
   }
   try {
    await transporter.sendMail(emailOptions);
    console.log('E-mail envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l envoi de l E-mail ', error);
    throw new Error('L E-mail n a pas pu être envoyé');
  }
}

module.exports = sendEmail;