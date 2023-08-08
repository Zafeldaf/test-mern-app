import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "./FormContainer.jsx";
import { Link } from "react-router-dom";
import { ApiInstance } from "../axiosConfig.js";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ApiInstance.post("/api/posts", formData)
            .then((response) => {
                // Handle success if needed
                console.log("Post created:", response.data);
                // Clear the form after successful creation
                setFormData({
                    title: "",
                    body: "",
                });
            })
            .catch((error) => {
                // Handle error if needed
                console.error("Error creating post:", error);
            });
    };

    return (
        <FormContainer>
            <h1>Create Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2" controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="body">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Link to="/posts">
                    <Button type="submit" variant="primary">
                        Create Post
                    </Button>
                </Link>
            </Form>
        </FormContainer>
    );
};

export default CreatePost;
