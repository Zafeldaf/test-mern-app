import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PostsAccordion = ({ post, user, comments }) => {
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchComments = () => {
        setIsLoading(true);
        axios.get(`/api/comments`).then((response) => {
            const postComments = response.data.filter(
                (comment) => comment.postId === post.id
            );
            comments.set(post.id, postComments);
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
                {user ? (
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle1">
                                {user.name}
                            </Typography>
                            <Typography variant="body2">
                                Username: {user.username}
                            </Typography>
                            <Typography variant="body2">
                                Email: {user.email}
                            </Typography>
                            <Typography variant="body2">
                                Phone: {user.phone}
                            </Typography>
                            <Typography variant="body2">
                                Website: {user.website}
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    <Typography>
                        <CircularProgress />
                    </Typography>
                )}
                {expanded && (
                    <>
                        {isLoading ? (
                            <Typography>
                                <CircularProgress />
                            </Typography>
                        ) : comments.has(post.id) &&
                          comments.get(post.id).length > 0 ? (
                            <ul>
                                {comments.get(post.id).map((comment) => (
                                    <li key={comment.id}>{comment.body}</li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>No comments for this post.</Typography>
                        )}
                    </>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

const PostAccordion = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState(new Map());
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [totalPosts, setTotalPosts] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        axios.get("/api/posts").then((response) => {
            setTotalPosts(response.data.length);
            setPosts(response.data.slice(startIndex, endIndex));
        });

        axios.get("/api/datausers").then((response) => {
            setUsers(response.data);
        });
    }, [currentPage, postsPerPage]);

    useEffect(() => {
        axios.get(`/api/comments`).then((response) => {
            const allComments = response.data;
            const postCommentsMap = new Map();
            posts.forEach((post) => {
                const postComments = allComments.filter(
                    (comment) => comment.postId === post.id
                );
                postCommentsMap.set(post.id, postComments);
            });
            setComments(postCommentsMap);
        });
    }, [posts]);

    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchKeywordChange = (event) => {
        setSearchKeyword(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
        setFilterValue("");
        setCurrentPage(1);
    };

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
        setCurrentPage(1);
    };

    const getUserForPost = (postId) => {
        const post = posts.find((p) => p.id === postId);
        return users.find((user) => user.id === post.userId);
    };

    const filteredPosts = posts.filter((post) => {
        if (filterType === "datausers") {
            const user = getUserForPost(post.id);
            if (!user) return false;

            const searchString = `${user.id} ${user.name} ${user.email}`;
            return searchString
                .toLowerCase()
                .includes(filterValue.toLowerCase());
        } else if (filterType === "posts") {
            const searchString = `${post.id} ${post.title} ${post.body}`;
            return searchString
                .toLowerCase()
                .includes(filterValue.toLowerCase());
        } else {
            return true;
        }
    });

    const searchedPosts = filteredPosts.filter((post) => {
        const searchString = `${post.id} ${post.title} ${post.body}`;
        return searchString.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    return (
        <div>
            <div>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchKeyword}
                    onChange={handleSearchKeywordChange}
                />
                <FormControl>
                    <InputLabel>Filter Type</InputLabel>
                    <Select
                        value={filterType}
                        onChange={handleFilterTypeChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="datausers">Data Users</MenuItem>
                        <MenuItem value="posts">Posts</MenuItem>
                    </Select>
                </FormControl>
                {filterType && (
                    <TextField
                        label="Filter Value"
                        variant="outlined"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                    />
                )}
            </div>

            <Grid container spacing={2}>
                {searchedPosts.map((post) => {
                    const user = getUserForPost(post.id);
                    return (
                        <Grid key={post.id} item xs={12} sm={6}>
                            <PostsAccordion
                                post={post}
                                user={user}
                                comments={comments}
                            />
                        </Grid>
                    );
                })}
            </Grid>

            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    className="pagebtns"
                >
                    Previous Page
                </button>
                <button
                    disabled={
                        posts.length < postsPerPage ||
                        currentPage * postsPerPage >= totalPosts
                    }
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    className="pagebtns"
                >
                    Next Page
                </button>
                <FormControl>
                    <InputLabel>Posts Per Page</InputLabel>
                    <Select
                        value={postsPerPage}
                        onChange={handlePostsPerPageChange}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default PostAccordion;
