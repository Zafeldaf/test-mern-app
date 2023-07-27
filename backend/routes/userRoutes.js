import express from "express";
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
    createUser,
    deleteUser,
    getDataUsers,
} from "../controllers/dataUserController.js";
import { getPosts } from "../controllers/postController.js";
import { getComments } from "../controllers/commentsController.js";

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
router.get("/datausers", getDataUsers);
router.get("/comments", getComments);

export default router;
