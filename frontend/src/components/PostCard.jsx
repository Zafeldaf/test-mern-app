import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container, Grid, Typography } from "@mui/material";
import UserCard from "./UserCard";
import CommentCard from "./CommentCard";

function PostCard({ post }) {
    return (
        <Grid item xs={12} sm={6} md={4} lg={4} key={post.id}>
            <div>
                <Card sx={{ maxWidth: 300 }}>
                    <CardContent>
                        {post.user && <UserCard user={post.user} />}
                        <Typography>
                            <strong>User ID: </strong>
                            {post.userId}
                        </Typography>
                        <Typography>
                            <strong>Post ID: </strong>
                            {post.id}
                        </Typography>
                        <Typography>
                            <strong>Post Title: </strong>
                            {post.title}
                        </Typography>
                        <Typography>
                            <strong>Post Body: </strong>
                            {post.body}
                        </Typography>
                        {post.comments.map((comment) => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </Grid>
    );
}

export default function PostCardContainer() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("This component will be mounted now.");

        const fetchData = async () => {
            try {
                const postsResponse = await axios.get("/api/posts");
                const postsData = postsResponse.data;

                const mappedPosts = postsData.map((post) => ({
                    ...post,
                    comments: [],
                    user: null,
                }));

                setPosts(mappedPosts);

                await Promise.all(
                    mappedPosts.map(async (post, index) => {
                        const [commentsResponse, userDataResponse] =
                            await Promise.all([
                                axios.get(`/api/comments?postId=${post.id}`),
                                axios.get(`/api/datausers?id=${post.userId}`),
                            ]);

                        const postComments = commentsResponse.data;
                        const userData = userDataResponse.data;

                        setPosts((prevPosts) => {
                            const updatedPosts = [...prevPosts];
                            updatedPosts[index] = {
                                ...updatedPosts[index],
                                comments: postComments,
                                user: userData,
                            };
                            return updatedPosts;
                        });
                    })
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => {
            console.log("This component will be unmounted now.");
        };
    }, []);

    const postsRender = posts.map((post) => (
        <PostCard key={post.id} post={post} />
    ));

    return (
        <Container fixed>
            <Grid container spacing={2}>
                {postsRender}
            </Grid>
        </Container>
    );
}
