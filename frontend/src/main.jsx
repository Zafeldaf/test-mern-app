import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import UserScreen from "./Screens/UserScreen.jsx";
import PostScreen from "./Screens/PostScreen.jsx";
import AlbumsScreen from "./Screens/AlbumsScreen.jsx";
import CreateUser from "./components/CreateUser.jsx";
import CreatePost from "./components/CreatePost.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            <Route path="" element={<PrivateRoute />}>
                <Route path="/users" element={<UserScreen />} />
            </Route>
            <Route path="" element={<PrivateRoute />}>
                <Route path="/posts" element={<PostScreen />} />
            </Route>
            <Route path="" element={<PrivateRoute />}>
                <Route path="/albums" element={<AlbumsScreen />} />
            </Route>
            <Route path="" element={<PrivateRoute />}>
                <Route path="/users/create" element={<CreateUser />} />
            </Route>
            <Route path="" element={<PrivateRoute />}>
                <Route path="/posts/create" element={<CreatePost />} />
            </Route>
        </Route>,
    ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
);
