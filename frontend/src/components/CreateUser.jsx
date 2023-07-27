import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prevFormData) => ({
                ...prevFormData,
                [parent]: {
                    ...prevFormData[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Check if the form data is captured correctly
        axios
            .post("/api/datausers", formData)
            .then((response) => {
                console.log("User created:", response.data);
                // Do something after successful creation
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                // Handle error
            });
    };

    const success = () => {
        toast.success("User Created");
    };

    return (
        <FormContainer>
            <h1>Create User</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="suite">
                    <Form.Label>Suite</Form.Label>
                    <Form.Control
                        type="text"
                        name="address.suite"
                        value={formData.address.suite}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="zipcode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="address.zipcode"
                        value={formData.address.zipcode}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="company.name">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="company.name"
                        value={formData.company.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="company.catchPhrase">
                    <Form.Label>Company Catch Phrase</Form.Label>
                    <Form.Control
                        type="text"
                        name="company.catchPhrase"
                        value={formData.company.catchPhrase}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="my-2" controlId="company.bs">
                    <Form.Label>Company BS</Form.Label>
                    <Form.Control
                        type="text"
                        name="company.bs"
                        value={formData.company.bs}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Link to="/data/users">
                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-3"
                        onClick={success}
                    >
                        Submit
                    </Button>
                </Link>
            </Form>
        </FormContainer>
    );
};

export default CreateUser;
