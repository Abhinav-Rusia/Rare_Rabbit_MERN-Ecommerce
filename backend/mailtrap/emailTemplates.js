export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; color: #333; padding: 20px; max-width: 600px; margin: auto;">
  <div style="background: linear-gradient(to right, #7f5af0, #2cb67d); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0;">Let’s Get You Verified 🔐</h1>
  </div>
  <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <p>Hey there 👋</p>
    <p>We’re hyped to have you at <strong>Rare Rabbit</strong>! Use the code below to verify your email and unlock your experience:</p>
    <div style="text-align: center; margin: 24px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #7f5af0;">{verificationCode}</span>
    </div>
    <p>This code expires in <strong>15 minutes</strong>. Don’t keep us waiting! 😉</p>
    <p>If you didn’t sign up, no worries — just ignore this email.</p>
    <p>Cheers,<br>The Rare Rabbit Team 🐇</p>
  </div>
  <p style="text-align: center; font-size: 0.75rem; color: #888; margin-top: 24px;">This is an automated message — no need to reply!</p>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Success</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; color: #333; padding: 20px; max-width: 600px; margin: auto;">
  <div style="background: linear-gradient(to right, #7f5af0, #2cb67d); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0;">You Did It! ✅</h1>
  </div>
  <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <p>Hey legend,</p>
    <p>Your password reset was a success! You’re all set to get back in.</p>
    <div style="text-align: center; margin: 24px 0;">
      <div style="background-color: #2cb67d; color: white; width: 60px; height: 60px; border-radius: 50%; line-height: 60px; font-size: 28px; display: inline-block;">✓</div>
    </div>
    <p>If this wasn’t you, contact Rare Rabbit support ASAP ⚠️</p>
    <p><strong💡 Pro Tip:</strong> Secure your account by:</p>
    <ul>
      <li>Using a strong, unique password</li>
      <li>Turning on 2FA</li>
      <li>Staying off sketchy sites 😅</li>
    </ul>
    <p>Cheers,<br>The Rare Rabbit Team 🐇</p>
  </div>
  <p style="text-align: center; font-size: 0.75rem; color: #888; margin-top: 24px;">This is an automated message — no need to reply!</p>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; color: #333; padding: 20px; max-width: 600px; margin: auto;">
  <div style="background: linear-gradient(to right, #7f5af0, #2cb67d); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0;">Oops? Let’s Fix That 🔁</h1>
  </div>
  <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <p>Hey,</p>
    <p>We got a request to reset your Rare Rabbit password. Tap below to create a new one:</p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="{resetURL}" style="background-color: #7f5af0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link expires in <strong>1 hour</strong> for your safety.</p>
    <p>If you didn’t request this, you can ignore it — we got your back 💪</p>
    <p>With love,<br>The Rare Rabbit Team 🐇</p>
  </div>
  <p style="text-align: center; font-size: 0.75rem; color: #888; margin-top: 24px;">This is an automated message — no need to reply!</p>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Rare Rabbit</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; color: #333; padding: 20px; max-width: 600px; margin: auto;">
  <div style="background: linear-gradient(to right, #7f5af0, #2cb67d); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to the Rabbit Hole 🐇✨</h1>
  </div>
  <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <p>Hey {userName},</p>
    <p>We’re stoked to have you here at <strong>Rare Rabbit</strong> — where cool meets community 🫶</p>
    <p>Here’s what’s next:</p>
    <ul style="padding-left: 20px;">
      <li>🛠️ Set up your profile and explore features</li>
      <li>🧠 Discover tips, tools, and resources</li>
      <li>📬 Stay tuned for fresh updates & perks</li>
    </ul>
    <p>If you ever get stuck or just wanna chat, we’re just an email away.</p>
    <p>Welcome again,<br>The Rare Rabbit Team 🐇</p>
  </div>
  <p style="text-align: center; font-size: 0.75rem; color: #888; margin-top: 24px;">This is an automated message — no need to reply!</p>
</body>
</html>
`;
