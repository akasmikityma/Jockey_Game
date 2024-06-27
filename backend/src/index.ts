import { WebSocketServer } from "ws";
import { GameManager } from "./core/GameManager";

const ws=new WebSocketServer({port:8080});

const  gameManager=new GameManager();
ws.on('connection',(ws)=>{
    gameManager.addUser(ws);
    ws.on('close',()=>gameManager.removeUser(ws));
})