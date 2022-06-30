const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const tenants = [
  {
    label: 'a',
    total: 30,
  },
  {
    label: 'b',
    total: 20,
  },
  {
    label: 'c',
    total: 50,
  }
];

const generateMessage = (label, index) => {
  const user = `user${label}${index}`;
  const sender = `${user}@customercity.com`;
  return {
    from: sender,
    to: 'test@test.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
}

const start = async () => {
  tenants.forEach(async ({ total, label }) => {
    for (let i = 1; i < total+1; i++) {
      try {
        const message = generateMessage(label, i);
        await sgMail.send(message);
      } catch (err) {
        console.error(err);
      }
    }
  });
}

start();
