
import { useEffect, useState } from "react";
import { Socket_ME } from "./atoms";
import { useRecoilState } from "recoil";
// const WS_URL='https://jockey-game-1.onrender.com'
const WS_URL = 'ws://localhost:8080';

export const useSocketHook = () => {
    // const navigate = useNavigate();
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [thisSocket, setThisSocket] = useRecoilState(Socket_ME);
    console.log(thisSocket);
    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        console.log(`Socket created`);

        ws.onopen = () => {
            console.log(`WebSocket connection opened`);
            setSocket(ws);
            setThisSocket(ws);
            
            // Check for playerId in localStorage and attach it to this socket
            const storedPlayerId = localStorage.getItem("playerId");
            if (storedPlayerId) {
                ws.send(JSON.stringify({ type: "reconnect", playerId: storedPlayerId }));
                console.log(`Reconnection request sent with playerId: ${storedPlayerId}`);
            } else {
                console.log("No playerId found. Starting a new session.");
            }
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "playerId":
                    // Store the playerId in localStorage
                    console.log("handling playerId message in useSocketHook.ts ",message.playerId)
                    localStorage.setItem("playerId", message.playerId);
                    console.log(`Player ID received and stored: ${message.playerId}`);
                    break;

                case "reconnect":
                    console.log("Reconnection message received in useSocketHook.ts:", message);
                    // Pass the message to the component for handling
                    if(message.msg.includes("Successfully reconnected to game")){
                        // navigate(`/board/socket${socket}`);
                    }
                    break;
                case "error":
                    console.log("Error message from server:", message.msg);
                    // Broadcast error so UI can decide how to react (toast, show button, disable auto-reconnect)
                    window.dispatchEvent(new CustomEvent("ws-error", { detail: message }));
                    break;
                default:
                    console.log("Unhandled message type:", message.type);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            // setSocket(null);
            // alert("Connection lost. Attempting to reconnect...");
            setTimeout(()=>{
                console.log("Attempting to reconnect ");
                const newWs = new WebSocket(WS_URL);
                setSocket(newWs);
                setThisSocket(newWs);
            },1000)
        };

        return () => {
            ws.close();
        };
    }, []);

    return socket;
};