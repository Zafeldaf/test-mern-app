import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer.jsx";
import { ApiInstance } from "../axiosConfig.js";

const EmailVerification = () => {
    const { token } = useParams();
    const [verificationStatus, setVerificationStatus] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await ApiInstance.get(`/api/verify/${token}`);
                setVerificationStatus(response.data.message);
            } catch (error) {
                console.log(error);
                setVerificationStatus("Email verification failed.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div>
            <FormContainer>
                <h2>Email Verification Status</h2>
                <p>{verificationStatus}</p>
            </FormContainer>
        </div>
    );
};

export default EmailVerification;
