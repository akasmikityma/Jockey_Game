import { useEffect, useState } from "react"
import { Socket_ME } from "./atoms";
import { useRecoilState } from "recoil";
const WS_URL='ws://localhost:8080'
export const  useSocketHook=()=>{
    const  [socket,setSocket]=useState<WebSocket|null>(null);
    const [thisSocket, setThisSocket] = useRecoilState(Socket_ME);
    useEffect(()=>{
        const ws =new WebSocket(WS_URL);
        console.log(`socket created`)
        ws.onopen=()=>{
            setSocket(ws);
            setThisSocket(ws)
        }

        ws.onclose=()=>{
            setSocket(null)
        }

        return ()=>{
            ws.close()
        }
    },[])
    return socket
}