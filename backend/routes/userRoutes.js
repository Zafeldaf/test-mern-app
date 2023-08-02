import express from "express";
import {
    authUser,
    getUserProfile,
    logoutUser,
    registerUser,
    updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
    createUser,
    deleteUser,
    getDataUsers,
} from "../controllers/dataUserController.js";
import { createPost, getPosts } from "../controllers/postController.js";
import { getComments } from "../controllers/commentsController.js";
import { uploadToS3 } from "../services/bucket.js";

const router = express.Router();

router.post("/users/", registerUser);
router.post("/users/auth", authUser);
router.post("/users/logout", logoutUser);

router
    .route("/users/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.get("/datausers", getDataUsers);
router.post("/datausers", createUser);
router.delete("/datausers/:id", deleteUser);

router.get("/posts", getPosts);
router.post("/posts", createPost);
router.get("/datausers", getDataUsers);
router.get("/comments", getComments);

router.post("/upload", async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const file = req.files.file;
        const fileKey = new Date().getTime() + "-img.png";
        const url = await uploadToS3(file, fileKey);

        //

        res.json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        res.status(500).json({ error: "Failed to upload file to S3" });
    }
});

export default router;
