import React from "react";
import { Link } from "react-router-dom";

const AlbumScreen = () => {
    return (
        <div className="container">
            <h1 className="usershead">Albums</h1>
            <Link to="/albums/uploadphoto" className="li">
                <button id="createbtn">Upload</button>
            </Link>
        </div>
    );
};

export default AlbumScreen;
