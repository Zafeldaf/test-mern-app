import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    body: String,
});

const postSchema = new mongoose.Schema({
    userId: Number,
    title: String,
    body: String,
    comments: [commentSchema], // Nested array of comments
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User schema
    },
});

const dataUserSchema = new mongoose.Schema({
    name: String,
    website: String,
});

const Comment = mongoose.model("Comment", commentSchema);
const Post = mongoose.model("Post", postSchema);
const DataUser = mongoose.model("User", dataUserSchema);

export { Comment, Post, DataUser };
