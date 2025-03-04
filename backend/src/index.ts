import { WebSocketServer } from "ws";
import { GameManager } from "./core/GameManager";
const PORT = Number(process.env.PORT) || 8080;

const ws = new WebSocketServer({ port: PORT, host: "0.0.0.0" });
const  gameManager=new GameManager();
ws.on('connection',(ws)=>{
    gameManager.addUser(ws);
    ws.on('close',()=>gameManager.removeUser(ws));
})