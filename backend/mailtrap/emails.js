import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
  } from "./emailTemplates.js";
  
  import { transporter, sender } from "./email.config.js";
  
  // Utility function for sending email
  const sendEmail = async ({ to, subject, html }) => {
    try {
      const info = await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to,
        subject: `Rare Rabbit | ${subject}`,
        html,
      });
  
      console.log(`✅ Email sent to ${to} | Message ID: ${info.messageId}`);
    } catch (error) {
      console.error(`❌ Email to ${to} failed:`, error.message);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  };
  
  export const sendVerificationEmail = async (email, verificationToken) => {
    const html = VERIFICATION_EMAIL_TEMPLATE?.replace("{verificationCode}", verificationToken) || `
      <h2>Verify Your Email</h2>
      <p>Your verification code is: <strong>${verificationToken}</strong></p>
    `;
  
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html,
    });
  };
  
  export const sendWelcomeEmail = async (email, name) => {
    const html = WELCOME_EMAIL_TEMPLATE?.replace("{userName}", name) || `
      <h1>Welcome, ${name}!</h1>
      <p>We're thrilled to have you with us at <strong>Rare Rabbit</strong>.</p>
      <p>Start exploring today 🚀</p>
    `;
  
    await sendEmail({
      to: email,
      subject: "Welcome to Rare Rabbit",
      html,
    });
  };
  
  export const sendPasswordResetEmail = async (email, resetURL) => {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE?.replace("{resetURL}", resetURL) || `
      <h2>Password Reset Requested</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link is valid for a limited time.</p>
    `;
  
    await sendEmail({
      to: email,
      subject: "Reset Your Password",
      html,
    });
  };
  
  export const sendResetSuccessEmail = async (email) => {
    const html = PASSWORD_RESET_SUCCESS_TEMPLATE || `
      <h2>Password Reset Successful</h2>
      <p>Your password has been updated. If this wasn't you, please contact our support immediately.</p>
      <p>Stay secure,<br/>Rare Rabbit Team</p>
    `;
  
    await sendEmail({
      to: email,
      subject: "Password Reset Successful",
      html,
    });
  };
  