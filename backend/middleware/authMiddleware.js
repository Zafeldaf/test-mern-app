import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    const refreshToken = req.cookies.refreshToken;

    if (!token && !refreshToken) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        if (!token && refreshToken) {
            const decodedRefreshToken = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
            );
            const user = await User.findById(decodedRefreshToken.userId).select(
                "-password",
            );

            if (user) {
                generateToken(res, user._id);
                req.user = user;
                return next();
            }
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
    }
});

export { protect };
