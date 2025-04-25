export function generateVerificationOtpEmailTemplate(otpCode) {
    return `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 40px 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); color: #333;">
            <h2 style="text-align: center; color: #2c3e50;">Email Verification</h2>
            <p style="font-size: 16px; line-height: 1.6;">
                Hello,
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
                Please use the following One-Time Password (OTP) to verify your email address:
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="display: inline-block; font-size: 24px; font-weight: bold; background-color: #eaf4ff; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px; color: #007BFF;">
                    ${otpCode}
                </span>
            </div>
            <p style="font-size: 16px; line-height: 1.6;">
                This code is valid for a limited time. Please do not share this code with anyone.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
                If you did not request this code, you can safely ignore this email.
            </p>
            <p style="margin-top: 40px; font-size: 14px; color: #888; text-align: center;">
                Thank you,<br/>The Team
            </p>
        </div>
    `;
}


export function Click_on_the_link_to_reset_your_password(resetPasswordUrl) {
    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 12px; background-color: #f9f9f9; box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #2c3e50; text-align: center;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
            We received a request to reset your password. If this was you, simply click the button below to proceed.
        </p>

        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetPasswordUrl}" 
                style="display: inline-block; padding: 14px 28px; background-color: #4A90E2; color: white; text-decoration: none; font-size: 16px; border-radius: 8px;">
                Reset Password
            </a>
        </div>

        <p style="font-size: 14px; color: #888; line-height: 1.5;">
            If you did not request this password reset, please ignore this message. For your safety, do not share this link with anyone.
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">

        <p style="font-size: 12px; color: #aaa; text-align: center;">
            This link will expire shortly for security reasons.
        </p>
    </div>
    `;
}
