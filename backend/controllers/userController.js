import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../services/ses.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    if (!user.isVerified) {
        res.status(403);
        throw new Error("Email not verified. Please verify your email first");
    }

    generateToken(res, user._id);
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const verificationToken = uuidv4(); // Generate a verification token using uuidv4
    const user = await User.create({
        name,
        email,
        password,
        verificationToken, // Save the verification token in the user record
    });

    const verificationLink = `http://localhost:3000/verify/${verificationToken}`;

    const emailSubject = "Email Verification";
    const emailText = `Click the link to verify your email: ${verificationLink}`;
    const emailHtml = `<p>Click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`;

    // Send the verification email
    const emailSent = await sendEmail(
        email,
        emailSubject,
        emailText,
        emailHtml,
    );

    if (!emailSent) {
        res.status(500);
        throw new Error("Failed to send verification email");
    }

    generateToken(res, user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

const verifyUser = asyncHandler(async (req, res) => {
    const { token } = req.params;

    // Find the user with the provided verification token
    const user = await User.findOne({ verificationToken: token });

    console.log("User and token: ", user, token);

    if (!user) {
        return res
            .status(401)
            .json({ error: "Invalid token or user not found" });
    }

    // Mark the user as verified and remove the verification token
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "User logged out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };

    res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    authUser,
    registerUser,
    verifyUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};
