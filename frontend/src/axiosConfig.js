import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const accessToken = await new Promise((resolve) => {
                        refreshSubscribers.push((token) => {
                            resolve(token);
                        });
                    });

                    originalRequest.headers["Authorization"] = accessToken;
                    originalRequest._retry = true;

                    return api(originalRequest);
                } catch (err) {
                    // Handle refresh token error
                    return Promise.reject(err);
                }
            }

            isRefreshing = true;
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                console.log(refreshToken, "Refresh Token");
                let newAccessToken;
                try {
                    const refreshTokenResponse = await api.post(
                        "/refresh-token",
                        { refreshToken },
                    );
                    const { accessToken, refreshToken: newRefreshToken } =
                        refreshTokenResponse.data;

                    newAccessToken = accessToken;

                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);

                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (error) {
                    console.log(error, "Should logout");
                }

                refreshSubscribers.forEach((callback) =>
                    callback(newAccessToken),
                );

                refreshSubscribers = [];

                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (err) {
                // Handle refresh token error
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export const ApiInstance = api;
