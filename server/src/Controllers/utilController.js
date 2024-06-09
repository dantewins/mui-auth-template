const mailer = require('nodemailer');

const transporter = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "unitedwarrantyservice@gmail.com",
        pass: "apbdyphscfdlksih",
    }
});

const sendEmail = async (addresses = ["kimdanny0603@gmail.com"], subject, body, attachments = []) => {
    try {
        const email = {
            from: "United Web Service",
            to: process.env.MODE === "DEV" ? "kimdanny0603@gmail.com" : addresses,
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