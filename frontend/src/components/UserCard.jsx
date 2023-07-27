import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const UserCard = ({ user }) => {
    return (
        <Card sx={{ maxWidth: 300, marginBottom: "10px" }}>
            <CardContent>
                <Typography>
                    <strong>User ID: </strong>
                    {user.userId}
                </Typography>
                <Typography>
                    <strong>User's Name: </strong>
                    {user.name}
                </Typography>
                <Typography>
                    <strong>User's Website: </strong>
                    {user.website}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UserCard;
