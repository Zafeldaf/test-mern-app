import express from "express";
import {
    authUser,
    exchangeRefreshToken,
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

router.get("/datausers", protect, getDataUsers);
router.post("/datausers", protect, createUser);
router.delete("/datausers/:id", protect, deleteUser);

router.get("/posts", protect, getPosts);
router.post("/posts", protect, createPost);
router.get("/datausers", protect, getDataUsers);
router.get("/comments", protect, getComments);

router.post("/upload", protect, uploadPhoto);

router.get("/verify/:token", verifyUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/refresh-token", exchangeRefreshToken);

export default router;
