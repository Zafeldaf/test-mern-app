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
    Pagination,
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
                (comment) => comment.postId === post.id,
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
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/posts").then((response) => {
            setTotalPosts(response.data.length);
            setPosts(response.data);
        });

        axios.get("/api/datausers").then((response) => {
            setUsers(response.data);
        });

        axios.get(`/api/comments`).then((response) => {
            const allComments = response.data;
            const postCommentsMap = new Map();
            response.data.forEach((comment) => {
                if (!postCommentsMap.has(comment.postId)) {
                    postCommentsMap.set(comment.postId, []);
                }
                postCommentsMap.get(comment.postId).push(comment);
            });
            setComments(postCommentsMap);
        });
    }, []);

    useEffect(() => {
        // Filter and search posts based on the selected filter type, value, and search keyword
        const filtered = posts.filter((post) => {
            const user = users.find((u) => u.id === post.userId);
            const searchString = `${user?.id} ${user?.name} ${user?.email} ${post.id} ${post.title} ${post.body}`;
            return (
                searchString
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()) &&
                searchString
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase()) &&
                (filterType === "" ||
                    (filterType === "datausers" && user) ||
                    (filterType === "posts" && post) ||
                    (filterType === "userId" &&
                        post.userId
                            .toString()
                            .includes(filterValue.toLowerCase())) ||
                    (filterType === "username" &&
                        user?.username
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())) ||
                    (filterType === "usersName" &&
                        user?.name
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())) ||
                    (filterType === "usersEmail" &&
                        user?.email
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())) ||
                    (filterType === "postsId" &&
                        post.id
                            .toString()
                            .includes(filterValue.toLowerCase())) ||
                    (filterType === "postTitle" &&
                        post.title
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())))
            );
        });

        // Set the filtered posts
        setFilteredPosts(filtered);
        setCurrentPage(1); // Reset to the first page when filtering or searching
    }, [posts, users, filterType, filterValue, searchKeyword]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <div>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <FormControl id="filterform">
                    <InputLabel>Filter Type</InputLabel>
                    <Select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="userId">User ID</MenuItem>
                        <MenuItem value="usersName">User's Name</MenuItem>
                        <MenuItem value="usersEmail">User's Email</MenuItem>
                        {/*<MenuItem value="postsId">Post ID</MenuItem>*/}
                        <MenuItem value="postTitle">Post Title</MenuItem>
                    </Select>
                </FormControl>
                {filterType && (
                    <TextField
                        label="Filter Value"
                        variant="outlined"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                )}
            </div>

            <Grid container spacing={2}>
                {filteredPosts
                    .slice(
                        (currentPage - 1) * postsPerPage,
                        currentPage * postsPerPage,
                    )
                    .map((post) => {
                        const user = users.find((u) => u.id === post.userId);
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

            <div className="maincontain">
                <Pagination
                    count={Math.ceil(filteredPosts.length / postsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    className="pagebtns"
                />
                <FormControl className="formcontrol">
                    <InputLabel className="inputformcontrol">
                        Posts Per Page
                    </InputLabel>
                    <Select
                        value={postsPerPage}
                        onChange={(e) => setPostsPerPage(e.target.value)}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default PostAccordion;
