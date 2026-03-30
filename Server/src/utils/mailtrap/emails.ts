import { client, sender } from "./mailtrap"
import { ApiError } from "../ApiError"
import {
    generateEmailVerification,
    generatePasswordResetEmailHtml,
    generateResetSuccessEmailHtml,
    generateWelcomeEmailHtml
} from "./htmlEmail"

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
        throw new ApiError(500, "Failed to send email verification!")
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
                text: htmlContent,
                category: "welcome mail",
                template_variables: {
                    companyName: "🍴Dineflow 🍽️",
                    name: name
                }
            }
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to send welcome email!")
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
                text: htmlContent,
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
                text: htmlContent,
                category: "Reset password success mail",
            }
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Failed to send reset password success email!")
    }
}


export { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetPasswordSuccessEmail }