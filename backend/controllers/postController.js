import { Post } from "../models/postsModel.js";
import { Comment } from "../models/postsModel.js";
import { DataUser } from "../models/postsModel.js";

const getPosts = async (req, res) => {
    try {
        // Fetch posts from the "posts" database
        const posts = await Post.find().lean();

        // Fetch comments from the "comments" database
        const comments = await Comment.find().lean();

        // Fetch user data from the "datausers" database
        const users = await DataUser.find().lean();

        // Map comments and users to their respective posts
        posts.forEach((post) => {
            post.comments = comments.filter(
                (comment) => comment.postId === post._id
            );
            if (post.userId) {
                post.user = users.find((user) => user.userId === post.userId);
            }
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export { getPosts };
