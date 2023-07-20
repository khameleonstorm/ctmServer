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
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Welcome to CtmPro</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
    
        .content {
          background-color: #ffffff;
          padding: 20px;
        }

        .greeting {
          font-size: 26px !important; 
          font-weight: 500 !important;
          letter-spacing: -1.5px !important;
          word-spacing: 3px !important;
          color: #333333;
          margin-bottom: 20px;
        }

        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
    
        .cta-button {
          display: inline-block;
          width: 100%;
          max-width: 220px;
          background-color: #02ac60 !important;
          color: #fafafa !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          text-decoration: none !important;
          margin-bottom: 20px;
        }
    
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <h1 class="greeting">Welcome to CtmPro!</h1>
                  <p class="message">Dear [Name],</p>
                  <p class="message">We're thrilled to have you as part of our community. At CtmPro, we are dedicated to providing the best services and support to our customers.</p>
                  <p class="message">Click the button below to get started:</p>
                  <a class="cta-button" href="https://www.ctmpro.co/signup">Get Started</a>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@ctmpro.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The CtmPro Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                  <p class="footer-message">© 2023 CtmPro Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
    subject: 'Verify Your Email!',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Verify Your Email</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
    
        .content {
          background-color: #ffffff;
          padding: 20px;
        }
    
        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
    
        .cta-button {
          display: inline-block;
          width: 100%;
          max-width: 220px;
          background-color: #02ac60 !important;
          color: #fafafa !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          text-decoration: none !important;
          margin-bottom: 20px;
        }
    
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <p class="message">Hello!,</p>
                  <p class="message">We're thrilled to have you as part of our community. At CtmPro, we are dedicated to providing the best services and support to our customers.</p>
                  <p class="message">At CtmPro, we take your security and privacy very seriously.</p>
                  <p class="message">Click the button below to verify your email!</p>
                  <a class="cta-button" href="https://ctmpro.co/verify/${userEmail}">Verify Your Email</a>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@ctmpro.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The CtmPro Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                  <p class="footer-message">© 2023 CtmPro Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Password Reset</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
    
        .content {
          background-color: #ffffff;
          padding: 20px;
        }
    
        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
    
        .cta-button {
          display: inline-block;
          width: 100%;
          max-width: 220px;
          background-color: #02ac60 !important;
          color: #fafafa !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          text-decoration: none !important;
          margin-bottom: 20px;
        }
    
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <p class="message">Hello!,</p>
                  <p class="message">A request was sent for password reset, if this wasn't you please contact our customer service. Click the reset link below to proceed</p>
                  <a class="cta-button" href="https://ctmpro.co/forgotPassword/newPassword">Reset Password</a>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@ctmpro.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The CtmPro Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                  <p class="footer-message">© 2023 CtmPro Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Deposit Successful!</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
    
        .content {
          background-color: #ffffff;
          padding: 20px;
        }
    
        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <p class="message">Dear ${fullName},</p>
                  <p class="message">Your deposit of <strong>${amount}</strong>, ${date}, was successful! Your can now use your funds to trade on CtmPro.</p>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@ctmpro.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The CtmPro Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                  <p class="footer-message">© 2023 CtmPro Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Withdrawal Successful!</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
    
        .content {
          background-color: #ffffff;
          padding: 20px;
        }
    
        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #666666;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <p class="message">Dear ${fullName},</p>
                  <p class="message">Your Withdrawal of <strong>${amount}</strong>, ${date}, was successful! Thanks for choosing CtmPro!</p>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@ctmpro.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The CtmPro Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://www.ctmpro.co/static/media/logo.ca0cdbc6d61ddc5b8dfc.png" alt="CtmPro Logo">
                  <p class="footer-message">© 2023 CtmPro Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
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