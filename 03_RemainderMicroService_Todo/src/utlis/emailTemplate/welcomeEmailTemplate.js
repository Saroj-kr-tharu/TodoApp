const WelcomeEmailTemplate = (  username = "User" ) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuthService Welcome Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc;">
    <!-- Email Container -->
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f6f9fc; font-family: 'Poppins', Arial, sans-serif;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
                    <!-- Header with Enhanced Logo -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%); padding: 40px 0; text-align: center; border-radius: 16px 16px 0 0;">
                            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; margin: 0 auto; width: fit-content; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeq_PlctLqneopJcDxiuVeoRkOrlKSnq6tGw&s" alt="AuthService Logo" style="height: 60px; width: auto; margin-bottom: 15px;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">AuthService</h1>
                            </div>
                        </td>
                    </tr>

                    <!-- Welcome Message -->
                    <tr>
                        <td style="padding: 40px 30px 20px;">
                            <h2 style="margin: 0 0 20px; background: linear-gradient(to right, #6366f1, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; text-align: center; font-weight: 700;">
                                Welcome ${username}! ✨
                            </h2>
                            
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/011/976/274/small/stick-figures-welcome-free-vector.jpg" alt="Welcome Illustration" style="width: 100%; max-width: 500px; height: auto; margin: 20px 0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

                            <p style="margin: 0 0 15px; color: #1e293b; font-size: 18px; line-height: 1.8; font-weight: 600;">
                                Dear ${username},
                            </p>

                            <p style="margin: 0 0 15px; color: #334155; font-size: 16px; line-height: 1.8;">
                                🌟 Welcome to the future of authentication! We're absolutely delighted to have you join our elite community of security-conscious innovators. Get ready for an extraordinary journey into the world of enhanced security.
                            </p>

                            <p style="margin: 30px 0 15px; color: #1e293b; font-size: 18px; line-height: 1.8; font-weight: 600;">
                                Unlock Your Premium Features: ⚡
                            </p>

                            <ul style="margin: 0 0 20px; padding-left: 20px;">
                                <li style="color: #334155; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                                    <span style="color: #6366f1; font-weight: 600;">Enterprise-Grade Security</span> 🔒
                                </li>
                                <li style="color: #334155; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                                    <span style="color: #6366f1; font-weight: 600;">24/7 Premium Support</span> 💬
                                </li>
                                <li style="color: #334155; margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
                                    <span style="color: #6366f1; font-weight: 600;">Advanced Analytics</span> 📊
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

module.exports = WelcomeEmailTemplate;
