import { Container, Grid, Button, Box, TextField, Avatar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Context } from "../../index";
import Loader from "../Loader";
import { doc, setDoc, serverTimestamp, collection, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import Message from "../Message/Message";
import { getToken } from "firebase/messaging";

const Chat = () => {
    const bottomRef = useRef(null);
    const { auth, db } = React.useContext(Context)
    const [user] = useAuthState(auth)
    const [messages, loading, error] = useCollectionData(collection(db, "messages"));

    const [value, setValue] = useState("");
    const [currentReply, setCurrentReply] = useState(null);

    // const messages = [{
    //     uid: "123",
    //     displayName: user.displayName,
    //     photoUrl: user.photoURL,
    //     text: "test",
    //     createdAt: { time: "123" },
    //     replied_to: currentReply
    // },
    // {
    //     uid: user.uid,
    //     displayName: user.displayName,
    //     photoUrl: user.photoURL,
    //     text: "testfdubasfjkbajfbjkabfjkbjekfdafd hfjbadsj hfuda abfjbdjafbjk",
    //     createdAt: { time: "222" },
    //     replied_to: currentReply
    // }]
    // const loading = false
    // const error = ""

    const sendMessage = async () => {
        if (value !== "") {
            const docTest = doc(db, 'messages', `${Date.now()}`);
            setDoc(docTest, {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                text: value,
                createdAt: serverTimestamp(),
                replied_to: currentReply
            }
            )
            // fetch("https://progressier.com/send-push-notification", {
            //     method: "POST",
            //     mode: "no-cors",
            //     headers: {
            //         "authorization": "Bearer {your-api-key}",
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         "recipients": {
            //         },
            //         "title": `New Message from ${user.displayName}`,
            //         "body": value,
            //         "url": "https://fir-messenger-166b4.web.app/chat"
            //     }),
            // }).then(() => {
            //     console.log("Message sended")
            // }).catch((e) => {
            //     console.log(e)
            // })
            setValue("")
            cancelReply()
        }
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const cancelReply = () => {
        setCurrentReply(null)
        let chat = document.getElementById("chatwindow");
        if (chat) {
            chat.style.height = "80vh"
        }
    }

    const maxMarginSlide = 40

    const onTouchMoveFunction = (e, is_user) => {
        if (is_user) {
            let countedMargin = -(e.changedTouches[0].clientX - (e.target.clientWidth))
            if (countedMargin > maxMarginSlide) {
                e.target.style.marginRight = maxMarginSlide + "px"
            }
            else if (countedMargin < 0) {
                e.target.style.marginRight = "0px"
            }
            else {
                e.target.style.marginRight = -e.changedTouches[0].clientX + (e.target.clientWidth) + "px"
            }
        }
        else {
            let countedMargin = e.changedTouches[0].clientX - (e.target.clientWidth)
            if (countedMargin > maxMarginSlide) {
                e.target.style.marginLeft = maxMarginSlide + "px"
            }
            else if (countedMargin < 0) {
                e.target.style.marginLeft = "0px"
            }
            else {
                e.target.style.marginLeft = e.changedTouches[0].clientX - (e.target.clientWidth) + "px"
            }
        }
    }

    const onTouchEndFunction = (e, replyObj, is_user) => {
        if (is_user){
            if (e.target.style.marginRight === maxMarginSlide + "px") {
                setCurrentReply(replyObj)
                let chat = document.getElementById("chatwindow");
                if (chat) {
                    chat.style.height = "73vh"
                }
            }
            e.target.style.marginRight = "0px"
        }
        else{
            if (e.target.style.marginLeft === maxMarginSlide + "px") {
                setCurrentReply(replyObj)
                let chat = document.getElementById("chatwindow");
                if (chat) {
                    chat.style.height = "73vh"
                }
            }
            e.target.style.marginLeft = "0px"
        }
    }

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        console.log(error)
    }, [messages, error]);


    if (loading) {
        return <Loader />
    }

    return (
        <Container >
            <Grid container
                // style={{ height: window.innerHeight - 56}}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <div id="chatwindow" className="message-container">
                    {messages && messages.map(message =>
                        <Message
                            // ots={onTouchStartFunction}
                            otm={onTouchMoveFunction}
                            ote={onTouchEndFunction}
                            key={message.createdAt}
                            message={message}
                            is_user={message.uid === user.uid} />
                    )}
                    {!messages && <div>Error</div>}
                    <div ref={bottomRef} />
                </div>
                {currentReply && messages.filter(message => message === currentReply).map(message =>
                    <span key="replyHolder" className="replyHolder">
                        Reply to
                        <Grid container>
                            <div className={`reply ${message.uid === user.uid ? "rightr" : "leftr"}`} key="reply">
                                <div>{message.text}</div>
                                <Avatar className="replyAvatar" style={{
                                    width: "20px",
                                    height: "20px",
                                    position: "absolute",
                                    top: "1px",
                                    right: "5px",
                                    opacity: "0.5"
                                }} src={message.photoUrl} />
                            </div>
                            <button style={{
                                maxWidth: "30px",
                                display: "flex",
                                padding: "0px",
                                position: "absolute",
                                right: "-20px",
                                top: "50%",
                                border: "none",
                                backgroundColor: "white",
                                color: "red",
                            }}
                                onClick={cancelReply}
                                variant={"outlined"}
                                size="small"
                            ><BlockOutlinedIcon />
                            </button>
                        </Grid>
                    </span>
                )}
                <Grid
                    container
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={{ height: "60px" }}
                >
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        maxRows={2}
                        variant="outlined"
                        autoComplete="off"
                        onKeyPress={handleKeypress}
                        style={{ height: "inherit", width: "75%" }}
                    />
                    <Button style={{ height: "57px" }} onClick={sendMessage} variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Chat;