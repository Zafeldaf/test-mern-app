import { S3 } from "aws-sdk";

export const uploadToS3 = async (file, fileKey) => {
    const s3client = new S3({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
    });

    const uploaded = await s3client
        .putObject({
            Bucket: "mern-app-files",
            Key: fileKey,
            Body: file,
        })
        .promise();
    console.log("Uploaded File", uploaded);
};
