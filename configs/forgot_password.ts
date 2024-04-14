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

export const forgotPasswordEmail = async (email: string, code: number) => {
  console.log("Check");

  const message = {
    from: `"Zeal Workers Token" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to Zeal Workers Token!</title>
    </head>
    <body style="font-family: sans-serif; font-size: 14px; line-height: 1.5;">
      <h3 style="text-align: center; color: #333;">Welcome to Zeal Workers!</h3>
    
      <p style="margin-bottom: 10px;">Hello ${email},</p>
    
      <p style="margin-bottom: 10px;">We receive a request for your password change.</p>
    
      <p style="margin-bottom: 10px;">To continue, kindly verify with the code below below:</p>
    
      <p style="color: #007bff; margin-bottom: 10px;">${code}</p>

      <p style="margin-bottom: 10px;">Code expires in 10 mins.</p>
    
      <p style="margin-bottom: 10px;">If you did not initate this, do not worry, kindly disregard this email. And remember not to share any sensitive information with anyone.</p>
    
      <p style="margin-bottom: 10px;">If you have any questions, please don't hesitate to contact us at [Support Email Address].</p>
    
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
