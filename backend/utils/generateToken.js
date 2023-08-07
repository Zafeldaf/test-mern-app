import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1m",
    });

    res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 1000,
    });

    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "2d",
        },
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    });
};

export default generateToken;
