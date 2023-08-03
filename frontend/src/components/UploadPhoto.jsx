import React, { useState } from "react";
import FormContainer from "./FormContainer.jsx";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

                // Append form data to the formData object
                formData.append("file", file);
                formData.append(
                    "title",
                    document.getElementById("title").value,
                );
                formData.append(
                    "albumId",
                    document.getElementById("albumId").value,
                );

                await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                toast.success("File Uploaded");
            } catch (error) {
                toast.error("File Not Uploaded");
            }
        } else {
            toast.error("Please select a file to upload.");
        }
    };

    return (
        <div>
            <Link to="/albums">
                <Button type="button" variant="primary" className="my-2">
                    Go Back
                </Button>
            </Link>
            <FormContainer>
                <h1>Upload Photo</h1>
                <Form>
                    <Form.Group className="my-2" controlId="title">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="albumId">
                        <Form.Label>Album ID</Form.Label>
                        <Form.Control type="number" name="albumId" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="body">
                        <Form.Label>Select Photo</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    {/*<Link to="/photos">*/}
                    <Button
                        onClick={handleUpload}
                        type="button"
                        variant="primary"
                        className="my-2"
                    >
                        Upload
                    </Button>
                    {/*</Link>*/}
                </Form>
            </FormContainer>
        </div>
    );
};

export default UploadPhoto;
