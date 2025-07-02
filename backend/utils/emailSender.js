import dotenv from "dotenv";
import { newError } from "./errorHandler.js";
import nodemailer from "nodemailer";

dotenv.config({ path: "../config/.env" });

async function emailSender(email, subject, message) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.BARINTECH_EMAIL,
        pass: process.env.BARINTECH_EMAIL_PASS,
      },
    });

    const res = await transporter.sendMail({
      from: process.env.BARINTECH_EMAIL,
      to: email,
      subject: subject,
      html: message,
      headers: {
        "List-Unsubscribe": "<mailto:BarinTechnology@gmail.com>",
        "X-Mailer": "Barin ECommerce (https://yourdomain.com)",
      },
      priority: "high", // For important emails
    });

    return res;
  } catch (error) {
    console.log(process.env.BARINTECH_EMAIL_PASS);
    console.log(error);
    return newError(
      400,
      "مشکلی در ارسال ایمیل بوجود آمده است. مجددا تلاش کنید."
    );
  }
}

export { emailSender };
