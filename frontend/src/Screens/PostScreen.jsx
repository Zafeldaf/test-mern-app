import PostAccordion from "../components/PostAccordion.jsx";
import { Link } from "react-router-dom";

const PostScreen = () => {
    return (
        <>
            <div className="container">
                <h3 id="usershead">Posts</h3>
                <ul className="ul">
                    <li>
                        <Link to="/posts/create" className="li">
                            <button id="createbtn">Create</button>
                        </Link>
                    </li>
                </ul>
            </div>
            <PostAccordion />
        </>
    );
};
export default PostScreen;
