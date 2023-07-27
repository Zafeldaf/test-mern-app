import { Comment } from "../models/postsModel.js";

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().lean();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export { getComments };
