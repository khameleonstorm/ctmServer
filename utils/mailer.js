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
  }
});

function welcomeMail(username, userEmail){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${userEmail}`,
    subject: 'Welcome!',
    html: `
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Welcome CTM Pro!</title>
      <style>
        /* Body styles */
        body {
          font-family: sans-serif;
          font-size: 22px;
          line-height: 1.3;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        a{
          text-decoration: none;
        }

        /* Main content styles */
        main {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fafafa;
          padding: 20px;
        }

        .logo{
          width: 200px;
          margin-left: -20px;
        }

        h2{
          font-size: 2rem;
          font-weight: 700;
        }

        h3{
          font-size: 1.3rem;
          font-weight: 700;
          margin-top: -10px;
        }

        .bigp {
          margin-bottom: 20px;
        }

        /* Button styles */
        .button {
          display: inline-block;
          background-color: #00b35f;
          color: white;
          text-align: center;
          padding: 19px 50px;
          border-radius: 10px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .button:hover {
          background-color: #01e001;
        }

                  
        @media screen and (max-width: 500px){
          body{
            font-size: 17px;
          }

          .logo{
            width: 50%;
            margin-left: -12px;
          }

          main {
            max-width: 100%;
            height: 100vh;
          }

          h2{
            font-size: 1.5rem;
          }

          h3{
            font-size: 1.1rem;
            font-weight: 600;
            padding-bottom: 40px;
          }
          
          .bigp{
            margin-bottom: 20px;
            font-size: 1.2rem;
          }

          .button {
            width: 100%;
            font-size: 1rem;
            padding: 20px 0;
            text-align: center;
          }

        }
      </style>
    </head>
    <body>
      <main>
        <img class="logo" src="https://i.ibb.co/rkNR6rQ/ctm-logo.png" alt="logo">
        <h2>Hello! ${username}</h2>
        <p class="bigp">We're thrilled to have you join our community!</p>
        <p class="bigp">Please verify! your email address to access more services from CTM Pro!</p>
        <a href="http://localhost:3000/verify/${userEmail}"><button class="button">Verify your email address</button></a>
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        <p>Best Regard</p>
        <h3>CTM Pro Team</h3>
      </main>
    </body>
  </html>
    `,
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (!error) return  console.log(info.messageId)
    else console.log(error)
    transporter.close();
  });

}

exports.welcomeMail = welcomeMail;