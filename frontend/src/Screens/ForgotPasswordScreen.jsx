import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async () => {
        try {
            await axios.post("/api/forgot-password", { email });
            setMessage(
                "Password reset email sent successfully. Please check your email.",
            );
        } catch (error) {
            setMessage(
                error?.response?.data?.message || "Failed to send reset email.",
            );
        }
    };

    return (
        <div>
            <FormContainer>
                <h1>Forgot Password</h1>
                <Form onSubmit={handleForgotPassword}>
                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-3">
                        Reset Password
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
};

export default ForgotPasswordScreen;
