const generateForgottenPasswordEmailTemplate = (
  username = "User",
  resetLink = "https://example.com/reset"
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc;">
    <!-- Email Container -->
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f6f9fc; font-family: 'Poppins', Arial, sans-serif;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
                    <!-- Header with Logo -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%); padding: 40px 0; text-align: center; border-radius: 16px 16px 0 0;">
                            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; margin: 0 auto; width: fit-content; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeq_PlctLqneopJcDxiuVeoRkOrlKSnq6tGw&s" alt="AuthService Logo" style="height: 60px; width: auto; margin-bottom: 15px;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">AuthService</h1>
                            </div>
                        </td>
                    </tr>

                    <!-- Password Reset Message -->
                    <tr>
                        <td style="padding: 40px 30px 20px;">
                            <h2 style="margin: 0 0 20px; background: linear-gradient(to right, #6366f1, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; text-align: center; font-weight: 700;">
                                Reset Your Password, ${username}! 🔒
                            </h2>
                            
                            <p style="margin: 0 0 15px; color: #334155; font-size: 16px; line-height: 1.8; text-align: center;">
                                It seems you've forgotten your password. Don't worry, we’ve got you covered! Click the button below to reset your password:
                            </p>

                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${resetLink}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 12px; font-size: 18px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); transition: all 0.3s ease;">
                                    Reset Password
                                </a>
                            </div>

                            <p style="margin: 30px 0 15px; color: #64748b; font-size: 14px; line-height: 1.6; text-align: center;">
                                If the button above doesn't work, you can copy and paste the following link into your browser:
                            </p>
                            
                            <p style="margin: 0 0 15px; color: #6366f1; font-size: 14px; text-align: center; word-break: break-word;">
                                <a href="${resetLink}" style="color: #6366f1; text-decoration: none;">${resetLink}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px; border-radius: 0 0 16px 16px;">
                            <table role="presentation" style="width: 100%;">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 10px; color: #475569; font-size: 16px; font-weight: 600;">
                                            AuthService, Inc.
                                        </p>
                                        <p style="margin: 0; color: #64748b; font-size: 14px;">
                                            This is an automated message. If you did not request a password reset, please ignore this email.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

module.exports = generateForgottenPasswordEmailTemplate;
