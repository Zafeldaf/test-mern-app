import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PostAccordion = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchComments = () => {
        setIsLoading(true);
        axios.get(`/api/comments`).then((response) => {
            const postComments = response.data.filter(
                (comment) => comment.postId === post.id
            );
            setComments(postComments);
            setIsLoading(false);
        });
    };

    const handleAccordionChange = () => {
        setExpanded((prevExpanded) => !prevExpanded);
        if (!expanded) {
            fetchComments();
        }
    };

    return (
        <Accordion expanded={expanded} onChange={handleAccordionChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{post.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {isLoading ? (
                    <Typography>
                        <CircularProgress />
                    </Typography>
                ) : comments.length > 0 ? (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>{comment.body}</li>
                        ))}
                    </ul>
                ) : (
                    <Typography>No comments for this post.</Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

const YourComponent = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        axios.get("/api/posts").then((response) => {
            setPosts(response.data.slice(startIndex, endIndex));
        });
    }, [currentPage]);

    return (
        <div>
            {posts.map((post) => (
                <PostAccordion key={post.id} post={post} />
            ))}

            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    className="pagebtns"
                >
                    Previous Page
                </button>
                <button
                    disabled={posts.length < postsPerPage}
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    className="pagebtns"
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default YourComponent;
