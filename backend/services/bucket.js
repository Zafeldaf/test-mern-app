import AWS from "aws-sdk";

export const uploadToS3 = async (file, fileKey) => {
    console.log("file", file, fileKey);
    const s3client = new AWS.S3({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
        apiVersion: "2006-03-01",
    });

    const uploaded = await s3client
        .putObject({
            Bucket: "mern-app-files",
            Key: fileKey,
            Body: file.data,
            ContentType: "image/png",
            ACL: "public-read",
        })
        .promise();
    console.log("Uploaded File", uploaded);
    console.log(
        "Image URI",
        `https://mern-app-files.s3.ap-southeast-1.amazonaws.com/${fileKey}`,
    );

    return `https://mern-app-files.s3.ap-southeast-1.amazonaws.com/${fileKey}`;
};
