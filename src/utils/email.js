import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.JWT_EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "Welcome to GotOo",
      html: `
        <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
          <img src="cid:gotoologo" alt="GotOo Logo" style="max-width: 150px; margin-bottom: 20px;">
          <h1 style="color: #333;">Welcome to GotOo ${data.name}!</h1>
          <p style="font-size: 16px; color: #555;">
            Your ultimate daily companion for organizing your tasks, calendar, notes, and weather updates.
          </p>
          <p style="font-size: 14px; color: #777;">
            We are excited to have you on board. Start planning your day smarter with GotOo!
          </p>
        </div>
      `,
      attachments: [
        {
          filename: "GotOo.png",
          path: "public/Gotoo.png",
          cid: "gotoologo",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
