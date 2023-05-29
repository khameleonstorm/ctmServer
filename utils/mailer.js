const nodemailer = require('nodemailer');
require('dotenv').config()


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.SMTP_USER}`,
    pass: `${process.env.SMTP_PASSWORD}`
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});




async function welcomeMail(username, userEmail){
  // setup email data
  let mailOptions = {
    from: "info@ctmpro.co.uk",
    to: `${userEmail}`,
    subject: 'Welcome!',
    html: `
    <html>
    <head>
      <title>Welcome CTM Pro!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
    
          main {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            background-color: #fafafa;
            padding: 20px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
          }
  
        a{
          text-decoration: none;
          color: inherit;
        }
  
        h1{
          font-size: 5.5rem;
          filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.1));
          font-weight: 800;
          color: #00b35f;
          letter-spacing: -6px;
          line-height: .8;
        }
  
        h1 span{
          font-size: 2rem;
          font-weight: 200;
          color: #000000a9;
          letter-spacing: -2px;
        }
  
        .bigp {
          font-size: 1.2rem;
          line-height: 1.5;
          font-weight: 500;
        }
  
        .button {
          width: 100%;
          max-width: 300px;
          background-color: rgba(0, 179, 95, 0.05);
          border: 0.5px solid rgba(0, 179, 95, 0.7);
          text-align: center;
          padding: 20px;
          border-radius: 15px;
          font-weight: 500;
        }
  
      </style>
    </head>
    <body>
    <main>
      <h1><span>Welcome To</span><br /> CtmPro</h1>
      <p class="bigp">HelloOO! ${username}</p>
      <p class="bigp">We're thrilled to have you join our community.
        Please verify! your email address to access more services from CtmPro!
      </p>
      <a href="https://ctmpro.co/verify/${userEmail}" class="button">Verify Your Email Address</a>
    </main>
    </body>
  </html>
    `,
  };
  
  
  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent: %s", info.messageId);

}



// Password reset mail
function passwordReset(userEmail){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${userEmail}`,
    subject: 'Password Reset!',
    html: `
    <html>
    <head>
      <title>Password Reset</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
    
          main {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            background-color: #fafafa;
            padding: 20px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
          }
  
        a{
          text-decoration: none;
          color: inherit;
        }
  
        h1{
          font-size: 5.5rem;
          filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.1));
          font-weight: 800;
          color: #00b35f;
          letter-spacing: -6px;
          line-height: .8;
        }
  
        .bigp {
          font-size: 1.2rem;
          line-height: 1.5;
          font-weight: 500;
        }
  
        .button {
          width: 100%;
          max-width: 300px;
          background-color: rgba(0, 179, 95, 0.05);
          border: 0.5px solid rgba(0, 179, 95, 0.7);
          text-align: center;
          padding: 20px;
          border-radius: 15px;
          font-weight: 500;
        }
  
      </style>
    </head>
    <body>
      <main>
        <h1>CtmPro</h1>
        <p class="bigp">A request was sent for password reset, if this wasn't you please contact our customer service. Click the reset link below to proceed</p>
        <a href="https://ctmpro.co/forgotPassword/newPassword" class="button">Reset Password</a>
      </main>
    </body>
  </html>
    `,
};


let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);

}



// Alert Admin! mail
function alertAdmin(email, amount, date, type){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${process.env.SMTP_USER}`,
    subject: 'Alert Admin!',
    html: `
    <html>
    <head>
      <title>Alert Admin!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
  
        main {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          background-color: #fafafa;
          padding: 20px;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
        }
  
        a{
          text-decoration: none;
          color: inherit;
        }
  
        h1{
          font-size: 5.5rem;
          filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.1));
          font-weight: 800;
          color: #00b35f;
          letter-spacing: -6px;
          line-height: .8;
        }
  
        .bigp {
          font-size: 1.2rem;
          line-height: 1.5;
          font-weight: 500;
        }
  
      </style>
    </head>
    <body>
      <main>
        <h1>CtmPro</h1>
        <p class="bigp">A ${type} request of $${amount} was initiated by a user with this email: ${email}, date: ${date}</p>
    </body>
  </html>
    `,
};


let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);

}

exports.alertAdmin = alertAdmin;
exports.welcomeMail = welcomeMail;
exports.passwordReset = passwordReset;