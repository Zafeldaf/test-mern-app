import express from "express";
import {
    authUser,
    forgotPassword,
    getUserProfile,
    logoutUser,
    registerUser,
    resetPassword,
    updateUserProfile,
    verifyUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
    createUser,
    deleteUser,
    getDataUsers,
} from "../controllers/dataUserController.js";
import { createPost, getPosts } from "../controllers/postController.js";
import { getComments } from "../controllers/commentsController.js";
import { uploadPhoto } from "../controllers/uploadImageController.js";

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

router.post("/upload", uploadPhoto);

router.get("/verify/:token", verifyUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
