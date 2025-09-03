import nodemailer from "nodemailer";
import type { Context } from "koa";
import fs from "fs/promises";

export default {
  async sendEmail(ctx: Context) {
    const body = ctx.request.body as any;
    const {
      companyName,
      contactPerson,
      email,
      phone,
      projectDescription,
      quantity,
      material,
      color,
      deliveryTime,
      deliveryDate,
      extraServices,
      message
    } = body;

    const { files } = ctx.request;
    let modelFile = files?.modelFile;

    if (Array.isArray(modelFile)) {
      modelFile = modelFile[0];
    }

    const allowedExtensions = ['.stl', '.3mf', '.gcode'];
    const fileExtension = modelFile.originalFilename?.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(`.${fileExtension}`)) {
    return ctx.badRequest("Invalid file type. Only .stl, .3mf, .gcode are allowed.");
    }

    if (!modelFile || !('filepath' in modelFile)) {
      return ctx.badRequest("Missing or invalid file");
    }

    const fileContent = await fs.readFile(modelFile.filepath);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"${companyName}", "${contactPerson}" <${email}>`,
        to: process.env.GMAIL_RECEIVER,
        subject: "New 3D Printing Request",
        html: `
          <p><strong>From:</strong> ${companyName}, ${contactPerson}</p>
          <p><strong>Contact:</strong> ${email}, ${phone}</p>
          <p><strong>Project:</strong> ${projectDescription}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Material:</strong> ${material}</p>
          <p><strong>Color:</strong> ${color || 'Not provided'}</p>
          <p><strong>Delivery Time:</strong> ${deliveryTime}</p>
          <p><strong>Delivery Date:</strong> ${deliveryDate || 'Not provided'}</p>
          <p><strong>Extra Services:</strong> ${extraServices}</p>
          <p><strong>Message:</strong> ${message || 'Not provided'}</p>
        `,
        attachments: [
          {
            filename: modelFile.originalFilename || "file",
            content: fileContent,
            contentType: modelFile.mimetype || "application/octet-stream",
          },
        ],
      });

      ctx.send({ success: true });
    } catch (error) {
      console.error("📛 Email error:", error);
      ctx.status = 500;
      ctx.body = { error: "Failed to send email", details: error.message };
    }
  },
};
