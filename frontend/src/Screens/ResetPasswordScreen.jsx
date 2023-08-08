import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiInstance } from "../axiosConfig.js";

const ResetPasswordScreen = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await ApiInstance.post(
                `/api/reset-password/${token}`,
                {
                    password,
                },
            );
            setMessage(response.data.message);
            // Optionally, you can redirect the user to the login screen after successful password reset
            navigate("/login");
        } catch (error) {
            setMessage(
                error.response.data.error || "Failed to reset password.",
            );
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            <p>
                Go back to <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default ResetPasswordScreen;
