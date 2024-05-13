import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const emailWithNodeMailer = async (emailData) => {
    
    try {
        console.log('SMTP_USER_NAME', process.env.SMTP_USER_NAME, 'SMTP_PASSWORD', process.env.SMTP_PASSWORD)
        const mailOptionsc = {
            from: process.env.SMTP_USER_NAME, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        }
        await transporter.sendMail(mailOptionsc)
        const info = await transporter.sendMail(mailOptionsc)
        console.log('Message sent: %s', info.response)
    } catch (error) {
        console.error('Error occured while sending email: ', error)
        throw error
    };
}

