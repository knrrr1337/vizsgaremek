import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/UserProvider/UserProvider';
import { PostHandlerContext } from '../../Contexts/PostHandlerProvider/PostHandlerProvider';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

function WebSocketComponent() {
    const [socket, setSocket] = useState(null);
    const {user} = useContext(AuthContext)
    const {getPosts} = useContext(PostHandlerContext)

    console.log(user)
    useEffect(() => {

                    // Open the WebSocket connection when the component mounts.
        const ws = new WebSocket("ws://localhost:4400/ws");

        ws.addEventListener("open", (event) => {
            console.log("Connected to WebSocket server");
            ws.send("Hello Server!");
        });


        // Listen for messages
        ws.addEventListener("message", (event) => {
            if (event.data === "getposts") {
                console.log("getting posts")
                getPosts(user.id)
            }
            console.log("Message from server:", event.data);
        });

        setSocket(ws);

        // Clean up: close the socket on unmount
        return () => {
            ws.close();
        };
        

    }, [user]); // Empty dependency ensures this runs once on mount.

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send("HELLOOOOOOO");
            console.log("Message sent");
        } else {
            console.log("WebSocket is not open yet");
        }
    };

    return (
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default WebSocketComponent;