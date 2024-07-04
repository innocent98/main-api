const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transport = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const confirmationEmail = async (email: String, token: String) => {
  console.log("Check");

  const message = {
    from: `"Zeal Workers Token" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Please confirm your account",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to Zeal Workers Token!</title>
    </head>
    <body style="font-family: sans-serif; font-size: 14px; line-height: 1.5;">
      <h3 style="text-align: center; color: #333;">Welcome to Zeal Workers!</h3>
    
      <p style="margin-bottom: 10px;">Hello ${email},</p>
    
      <p style="margin-bottom: 10px;">Welcome to Zeal Workers! We're excited to have you join our community.</p>
    
      <p style="margin-bottom: 10px;">To complete your registration, please verify your email address by clicking the link below:</p>
    
      <a href="https://zeal.zealworkers.com/verified?verify=${token}" style="color: #007bff;">Verify your email address</a>

      <p style="margin-bottom: 10px;">Link expires in 10 mins.</p>
    
      <p style="margin-bottom: 10px;">Once you have verified your email address, you will be able to log in to your account and start enjoying all the benefits of being a Zeal Workers Token member.</p>
    
      <p style="margin-bottom: 10px;">If you have any questions, please don't hesitate to contact us at ${process.env.EMAIL_USER}.</p>
    
      <p style="margin-bottom: 10px;">Thanks,</p>
      <p style="margin-bottom: 10px;">Zeal Workers Token Team</p>
    </body>
    </html>`,
  };

  await new Promise((resolve, reject) => {
    transport.sendMail(message, (err: any, info: any) => {
      if (err) {
        // console.log(err);
      } else {
        console.log("sent");
      }
    });
  });
};
