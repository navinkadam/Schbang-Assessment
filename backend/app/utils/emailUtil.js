const nodemailer = require("nodemailer");
const { promisifyCallback } = require("./promiseUtil");

const G_EMAIL = process.env.G_MAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    // host: "gmail", //smtp.gmail.com
    service: "gmail",
    auth: {
        user: G_EMAIL,
        pass: EMAIL_PASSWORD,
    },
    // secure: true,
});

async function sendEmail({ to, subject, text, html }) {
    try {
        const mailData = {
            from: G_EMAIL,
            to: "navinkadam1432@gmail.com",
            subject: subject,
            text: text,
            html: html,
        };

        const result = await promisifyCallback(transporter.sendMail.bind(transporter), mailData);
        console.log("🚀 ~ file: emailUtil.js ~ line 27 ~ sendEmail ~ result", result);
    } catch (error) {
        console.log("🚀 ~ file: emailUtil.js ~ line 29 ~ sendEmail ~ error", error);
    }
}

module.exports = { sendEmail };
