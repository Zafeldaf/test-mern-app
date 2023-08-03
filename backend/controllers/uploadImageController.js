import { uploadToS3 } from "../services/bucket.js";
import Image from "../models/imageModel.js";
import { v4 as uuidv4 } from "uuid";

export const uploadPhoto = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const file = req.files.file;
        const fileKey = uuidv4() + "-img.png";
        const url = await uploadToS3(file, fileKey);

        const image = new Image({
            id: uuidv4(),
            title: req.body.title,
            albumId: req.body.albumId,
            imageUrl: url,
        });

        const savedImage = await image.save();

        res.json({ message: "File uploaded successfully", image: savedImage });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({
            error: "Failed to upload file or save to the database",
        });
    }
};
