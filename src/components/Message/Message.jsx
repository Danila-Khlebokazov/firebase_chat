import React from "react";
import { Container, Grid, Button, Box, TextField, Avatar } from "@mui/material";
import { useSprings, animated } from '@react-spring/web'
import "./Message.css"

const Message = ({ message, is_user, ots, otm, ote }) => {
    const initialPos = { x: 0, y: 0 }

    let date = ''
    try {
        date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.createdAt.toDate())
    }
    catch {
        date = "Now"
    }

    return (
        <div
            // onTouchStart={event => ots(event, message.createdAt)}
            // // onTouchStart={handleClick}
            onTouchMove={event => otm(event, is_user)}
            onTouchEnd={event => ote(event, message, is_user)}
            className={`bubble ${is_user ? "right" : "left"}`}
            style={{
                backgroundColor: `${is_user ? "red" : "blue"}`,
                maxWidth: "60%",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
            }}>
            <Grid container style={{ fontSize: "15px", maxHeight: "40px", overflow: "hidden", opacity: "0.5", pointerEvents: "none" }}>
                <Avatar style={{ width: "20px", height: "20px" }} src={message.photoUrl} />
                <div>{message.displayName}</div>
            </Grid>
            <>{message.replied_to &&
            <div className="replyInMessage">
                <Grid container style={{ fontSize: "12px", maxHeight: "40px", overflow: "hidden", opacity: "0.5", pointerEvents: "none" }}>
                    <Avatar style={{ width: "15px", height: "15px" }} src={message.replied_to.photoUrl} />
                    <div>{message.replied_to.displayName}</div>
                </Grid>
            {message.replied_to.text}
            </div>}
            </>
            <div style={{ marginBottom: "10px", pointerEvents: "none" }}>{message.text}</div>
            <h6 className="time" style={{ pointerEvents: "none" }} >{date}</h6>
        </div>
    );
}

export default Message;