import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for GotOo",
      html: `
        <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
          <img src="cid:gotoologo" alt="GotOo Logo" style="max-width: 150px; margin-bottom: 20px;">
          <h1 style="color: #333;">GotOo OTP Verification</h1>
          <p style="font-size: 16px; color: #555;">
            Your OTP for password reset is:
          </p>
          <h2 style="color: #ff5733; font-size: 24px;">${otp}</h2>
          <p style="font-size: 14px; color: #777;">
            Please use this OTP within the next 5 minutes.
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
    console.error("Error sending OTP email:", error);
  }
};
