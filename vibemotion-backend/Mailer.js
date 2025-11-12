import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

export const sendWelcomeEmail = async (to, username, customMessage) => {
  try {
    await transporter.sendMail({
      from: `"Vibemotion" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Vibemotion Notification",
      html: customMessage
        ? `<h1>Hello, ${username}!</h1>${customMessage}`
        : `<h1>Welcome, ${username}!</h1><p>Thank you for registering!</p>`,
    });
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
