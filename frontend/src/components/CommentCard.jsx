import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CommentCard({ comment }) {
    return (
        <Card sx={{ maxWidth: 300, marginBottom: "10px" }}>
            <CardContent>
                <Typography>
                    <strong>Comment Name: </strong>
                    {comment.name}
                </Typography>
                <Typography>
                    <strong>Creator's Email: </strong>
                    {comment.email}
                </Typography>
                <Typography>
                    <strong>Comment Body: </strong>
                    {comment.body}
                </Typography>
            </CardContent>
        </Card>
    );
}
