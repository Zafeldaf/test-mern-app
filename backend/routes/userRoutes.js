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

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.get("/datausers", getDataUsers);
router.post("/datausers", createUser);
router.delete("/datausers/:id", deleteUser);

router.get("/posts", getPosts);
router.post("/posts", createPost);
router.get("/datausers", getDataUsers);
router.get("/comments", getComments);

export default router;
