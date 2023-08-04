import AWS from "aws-sdk";

AWS.config.update({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const sendEmail = async (toEmail, subject, text, html) => {
    console.log("Recipient", toEmail);
    const params = {
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: html,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: text,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: "zafeldaf@gmail.com",
    };

    try {
        const data = await new AWS.SES({ apiVersion: "2010-12-01" })
            .sendEmail(params)
            .promise();
        console.log("Email sent successfully:", data.MessageId);
        return true;
    } catch (err) {
        console.error("Error sending email:", err);
        return false;
    }
};

export default sendEmail;
