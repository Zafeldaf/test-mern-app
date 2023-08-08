import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import { ToastContainer } from "react-toastify";
import { Container } from "@mui/material";
import { ApiInstance } from "./axiosConfig.js";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if access token is present
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }

        const accessTokenExpirationTime = parseInt(
            JSON.parse(atob(accessToken.split(".")[1])).exp,
            10,
        );
        const currentTime = Math.floor(Date.now() / 1000);
        const refreshTime = 60;

        if (accessTokenExpirationTime - currentTime < refreshTime) {
            // refreshAccessToken();
        }
    }, [navigate]);

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("Token:", refreshToken);

        try {
            const response = await ApiInstance.post("/refresh-token", {
                headers: {
                    Authorization: refreshToken,
                },
            });

            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            console.log("Access token refreshed");
        } catch (error) {
            console.error("Failed to refresh access token");
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <Container className="my-2">
                <Outlet />
            </Container>
        </>
    );
};

export default App;
