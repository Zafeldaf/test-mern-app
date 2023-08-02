import React, { useState } from "react";
import FormContainer from "./FormContainer.jsx";
import { Button, Form } from "react-bootstrap";

const UploadPhoto = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                const fileKey = `file_${Date.now()}_${file.name}`;
                const formData = new FormData();

                formData.append("file", file);
                formData.append("fileKey", fileKey);

                await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                alert("File uploaded successfully!");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            alert("Please select a file to upload.");
        }
    };

    return (
        <div>
            <FormContainer>
                <h1>Upload Photo</h1>
                <Form>
                    <Form.Group className="my-2" controlId="title">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="body">
                        <Form.Label>Album ID</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="body">
                        <Form.Label>Select Photo</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button
                        onClick={handleUpload}
                        type="submit"
                        variant="primary"
                        className="my-2"
                    >
                        Upload
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
};

export default UploadPhoto;
