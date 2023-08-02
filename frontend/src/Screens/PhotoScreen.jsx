import React from "react";
import { Link } from "react-router-dom";

const PhotoScreen = () => {
    return (
        <div className="container">
            <h1 className="usershead">Photos</h1>
            <Link to="/photos/upload" className="li">
                <button id="createbtn">Upload</button>
            </Link>
        </div>
    );
};

export default PhotoScreen;
