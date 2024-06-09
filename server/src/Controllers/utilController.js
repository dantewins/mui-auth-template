const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "",
        pass: "",
    }
});

const sendEmail = async (addresses = [""], subject, body, attachments = []) => {
    try {
        const email = {
            from: "",
            to: process.env.MODE === "DEV" ? "" : addresses,
            subject: subject,
            html: body,
            attachments
        }

        await transporter.sendMail(email);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    sendEmail
}