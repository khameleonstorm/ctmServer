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




async function welcomeMail(userEmail){
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
  
        .bigp {
          font-size: 1.2rem;
          line-height: 1.5;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
    <main>
      <img style="width: 40%;" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo" />
      <p class="bigp">Hello, Welcome to CtmPro!</p>
      <p>We're excited to have you onboard and we hope you enjoy your experience with us. </p>
      <p class="bigp">Here's what you can do with us:</p>
      <p class="bigp">Exchange Digital Currencies</p>
      <p>Do you want to Buy or Sell crypto? You can exchange your crypto at the black market rate, no KYC required.</p>
      <p class="bigp">Buy USDT with funds in your digital wallet providers</p>
      <p>Use your Skrill, PayPal, perfect money, wise, Apple Pay, Google pay, Venmo, Zelle to purchase USDT.</p>
      <p class="bigp">Grow your money daily with CtmPro Bot</p>
      <p>
        Want to earn from 3.5% to 15% daily? CtmPro bot is an automated crypto flipping bot  
        capable of processing crypto flipping transactions 24/7 leaving users with daily profit.
      </p>
      <p class="bigp">How to reach us.</p>
      <p>Check our website for contact details or you can kindly email us info@ctmpro.co</p>
    </main>
    </body>
  </html>
    `,
  };
  
  
  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent: %s", info.messageId);

}



async function verifyMail(userEmail){
  // setup email data
  let mailOptions = {
    from: "info@ctmpro.co.uk",
    to: `${userEmail}`,
    subject: 'Verify Your Email Address!',
    html: `
    <html>
      <head>
        <title>Verify Your Email</title>
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
            color: black;
          }

          p {
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
        <img style="width: 40%;" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo" />
        <p>At CtmPro, we take your security and privacy very seriously.  </p>
        <p>We require all users to verify their email address before they can use their account.</p>
        <p>Please click the button below to verify your email address.</p>
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
          color: black;
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
        <img style="width: 40%;" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo" />
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
    to: `ozochichidera@gmail.com`,
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
  
        .bigp {
          font-size: 1.2rem;
          line-height: 1.5;
          font-weight: 500;
        }
  
      </style>
    </head>
    <body>
      <main>
        <img style="width: 40%;" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo" />
        <p class="bigp">A ${type} request of $${amount} was initiated by a user with this email: ${email}, date: ${date}</p>
      </main>
    </body>
  </html>
    `,
};


let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);
}



// deposit mail
function depositMail(fullName, amount, date, email){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${email}`,
    subject: 'Deposit Successful!',
    html: `
    <html>
      <head>
        <title>Deposit Successful!</title>
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
        </style>
      </head>
      <body>
      <main>
        <img style="width: 40%;" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo" />
        <p>Dear ${fullName}</p>
        <p>
          Your deposit of <strong>${amount}</strong>, ${date}, was successful!
          Your can now use your funds to trade on CtmPro.
        </p>
      </main>
      </body>
    </html>
    `,
};


let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);
}




// withdrawal mail
function withdrawalMail(fullName, amount, date, email){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${email}`,
    subject: 'Withdrawal Successful!',
    html: `
    <html>
      <head>
        <title>Withdrawal Successful!</title>
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
        </style>
      </head>
      <body>
      <main>
        <img style="width: 40%;" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo" />
        <p>Dear ${fullName}</p>
        <p>
          Your withdrawal of <strong>$${amount}</strong>, ${date}, was successful!
          Thank you for trading with CtmPro.
        </p>
      </main>
      </body>
    </html>
    `,
};


let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);
}


exports.verifyMail = verifyMail;
exports.alertAdmin = alertAdmin;
exports.welcomeMail = welcomeMail;
exports.passwordReset = passwordReset;
exports.depositMail = depositMail;
exports.withdrawalMail = withdrawalMail;