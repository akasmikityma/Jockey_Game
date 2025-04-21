// import { useEffect, useState } from "react"
// import { Socket_ME } from "./atoms";
// import { useRecoilState } from "recoil";
// // const WS_URL='https://jockey-game-1.onrender.com'
// const WS_URL='ws://localhost:8080'
// export const  useSocketHook=()=>{
//     const  [socket,setSocket]=useState<WebSocket|null>(null);
//     const [thisSocket, setThisSocket] = useRecoilState(Socket_ME);
//     console.log(thisSocket)
//     useEffect(()=>{
//         const ws =new WebSocket(WS_URL);
//         console.log(`socket created`)
//         ws.onopen=()=>{
//             setSocket(ws);
//             setThisSocket(ws)
//         }

//         ws.onclose=()=>{
//             setSocket(null)
//         }

//         return ()=>{
//             ws.close()
//         }
//     },[])
//     return socket
// }

import { useEffect, useState } from "react";
import { Socket_ME } from "./atoms";
import { useRecoilState } from "recoil";
// const WS_URL='https://jockey-game-1.onrender.com'
const WS_URL = 'ws://localhost:8080';

export const useSocketHook = () => {
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
                    break;

                default:
                    console.log("Unhandled message type:", message.type);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setSocket(null);
            alert("Connection lost. Attempting to reconnect...");
        };

        return () => {
            ws.close();
        };
    }, []);

    return socket;
};