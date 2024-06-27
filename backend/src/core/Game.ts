// //game has player1 and player2 for now and 
// import {WebSocket} from "ws"
// export class Game{
//     public Player1:WebSocket;
//     public Player2:WebSocket;

//     constructor(player1:WebSocket,player2:WebSocket){
//         this.Player1=player1;
//         this.Player2=player2;
//         this.Player1.send(JSON.stringify({
//             type:"init_game",
//             payload: {
//                 name: "bal"
//             }
//         }))
//         this.Player2.send(JSON.stringify({
//             type:"init_game",
//             payload:{
//                 name:"bara"
//             }
//         }))
//     }
// }
// make the players send who got what cards and shit ??


import { WebSocket } from "ws";
import { card } from "../CardsAll";

export interface plr extends WebSocket {
    cards: card[];
    hasStarted: boolean; // Track if the player has sent the "start" message
}

export class Game {
    public Players: plr[];
    public remainingCards:card[]
    public Jockey:string|number|card
    constructor(players: plr[]) {
        this.Players = players;
        this.remainingCards=[]
        this.Jockey='';
        for (let i = 0; i < this.Players.length; i++) {
            this.Players[i].send(JSON.stringify({
                msg: `I'm player ${i} and the cards: ${JSON.stringify(this.Players[i].cards)}`
            }));
        }
        console.log(this.remainingCards)
    }
    
    allPlayersStarted() {
        return this.Players.every(player => player.hasStarted);
    }
}
