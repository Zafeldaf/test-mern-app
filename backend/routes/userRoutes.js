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
import { deleteUser, getDataUsers } from "../controllers/dataUserController.js";
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

router.route("/datausers").get(protect, getDataUsers).post(protect, createPost);
router.route("/datausers/:id").delete(protect, deleteUser);

router.route("/posts").get(protect, getPosts).post(protect, createPost);
router.route("/datausers").get(protect, getDataUsers);
router.route("/comments").get(protect, getComments);

router.route("/upload").post(protect, uploadPhoto);

router.route("/verify/:token").get(protect, verifyUser);

router.route("/forgot-password").post(protect, forgotPassword);

router.route("/reset-password/:token").get(protect, resetPassword);

export default router;
