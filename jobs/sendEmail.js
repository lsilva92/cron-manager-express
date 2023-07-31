const fs = require('fs');
const sendEmail = require('../utils/email');

const htmlstream = fs.createReadStream('../templates/emailTemplate.html');

const email = async () => {
  try {
    await sendEmail({
      to: 'testing@gmail.com',
      subject: 'Email template example',
      text: 'This is an email example',
      html: htmlstream,
    });
    console.log('email sent');
  } catch (error) {
    console.log(error);
  }
};

email();
