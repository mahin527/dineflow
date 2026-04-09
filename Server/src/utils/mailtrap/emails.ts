import { client, sender } from "./mailtrap.js"
import { ApiError } from "../ApiError.js"
import {
    generateEmailVerification,
    generatePasswordResetEmailHtml,
    generateResetSuccessEmailHtml,
    generateWelcomeEmailHtml
} from "./htmlEmail.js"

const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipients = [
        { email }
    ]

    try {
        const res = await client.send(
            {
                from: sender,
                to: recipients,
                subject: "Verify your email",
                html: generateEmailVerification.replace("{verificationToken}", verificationToken),
                    category: "Email verification",
            }
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "User created, but failed to send email verification code!")
    }
}

const sendWelcomeEmail = async (email: string, name: string) => {
    const recipients = [
        { email }
    ]
    const htmlContent = generateWelcomeEmailHtml(name)
    try {
        const res = await client.send(
            {
                from: sender,
                to: recipients,
                subject: "Welcome to 🍴Dineflow 🍽️",
                html: htmlContent,
                category: "welcome mail",
                template_variables: {
                    companyName: "🍴Dineflow 🍽️",
                    name: name
                }
            }
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to send welcome email, please signin!")
    }
}

const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
    const recipients = [
        { email }
    ]
    const htmlContent = generatePasswordResetEmailHtml(resetUrl)
    try {
        const res = await client.send(
            {
                from: sender,
                to: recipients,
                subject: "Reset your password",
                html: htmlContent,
                category: "Reset password",
            }
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to send reset password email!")
    }
}

const sendResetPasswordSuccessEmail = async (email: string) => {
    const recipients = [
        { email }
    ]
    const htmlContent = generateResetSuccessEmailHtml()
    try {
        const res = await client.send(
            {
                from: sender,
                to: recipients,
                subject: "Password reset successfully",
                html: htmlContent,
                category: "Reset password success mail",
            }
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to send reset password success email!")
    }
}


export { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetPasswordSuccessEmail }