import nodemailer from "nodemailer";
import type { Context } from "koa";

export default {
  async sendEmail(ctx: Context) {
    const { name, email, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Missing required fields");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.GMAIL_RECEIVER,
        subject: "New Contact Form Message",
        html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
      });

      ctx.send({ success: true });
    } catch (error) {
      console.error("Email error:", error);
      ctx.internalServerError("Failed to send email");
    }
  },
};
