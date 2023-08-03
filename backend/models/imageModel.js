import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true }, // Define the 'id' field with unique constraint
        title: { type: String, required: true },
        albumId: { type: String, required: true },
        imageUrl: { type: String, required: true },
    },
    { collection: "photos" },
    {
        timestamps: true,
    },
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
