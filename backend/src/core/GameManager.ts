// import { DistributingCards, flatten_Cards } from "../GameMechanics";
// import { Game, plr } from "./Game";
// import WebSocket from "ws";

// export class GameManager {
//     private games: Game[];
//     private pendingPlayers: plr[];
//     private users: WebSocket[];

//     constructor() {
//         this.games = [];
//         this.pendingPlayers = [];
//         this.users = [];
//     }

//     addUser(socket: WebSocket) {
//         this.users.push(socket);
//         this.addHandler(socket);
//     }

//     removeUser(socket: WebSocket) {
//         this.users = this.users.filter(user => user !== socket);
//     }

//     private addHandler(socket: WebSocket) {
//         socket.on("message", (data) => {
//             const messageData = JSON.parse(data.toString());
//             console.log(messageData);

//             if (messageData.type === "init_game") {
//                 if (this.pendingPlayers.length >= 2) {
//                     const newPlayer: plr = Object.assign(socket, { cards: [], hasStarted: false });
//                     this.pendingPlayers.push(newPlayer);

//                     const game = new Game(this.pendingPlayers);
//                     this.games.push(game);
//                     this.pendingPlayers = [];
//                 } else {
//                     const newPlayer: plr = Object.assign(socket, { cards: [], hasStarted: false });
//                     this.pendingPlayers.push(newPlayer);
//                     console.log(`At else ${this.pendingPlayers.length}`);
//                 }
//             }

//             if (messageData.type === "start") {
//                 const currentPlayer = this.findPlayerInGames(socket);
//                 if (currentPlayer) {
//                     currentPlayer.hasStarted = true;

//                     const currGame = this.findGameByPlayer(socket);
//                     if (currGame && currGame.allPlayersStarted()) {
//                         const shuffledCardsArr = DistributingCards(currGame.Players.length, flatten_Cards);
//                         for (let i = 0; i <currGame.Players.length; i++) {
//                             currGame.Players[i].cards = shuffledCardsArr.playerArrays[i];
//                             currGame.Players[i].send(JSON.stringify({
//                                 msg: `Your cards: ${currGame.Players[i].cards}`
//                             }));
//                         }
//                     }
//                 }
//             }
//         });
//     }

//     private findPlayerInGames(socket: WebSocket): plr | undefined {
//         for (const game of this.games) {
//             for (const player of game.Players) {
//                 if (player === socket) {
//                     return player;
//                 }
//             }
//         }
//         return undefined;
//     }

//     private findGameByPlayer(socket: WebSocket): Game | undefined {
//         for (const game of this.games) {
//             if (game.Players.some(player => player === socket)) {
//                 return game;
//             }
//         }
//         return undefined;
//     }
// }

import { DistributingCards, flatten_Cards,getJockey } from "../GameMechanics";
import { Game, plr } from "./Game";
import WebSocket from "ws";

export class GameManager {
    private games: Game[];
    private pendingPlayers: plr[];
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingPlayers = [];
        this.users = [];
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            const messageData = JSON.parse(data.toString());
            console.log(messageData);

            if (messageData.type === "init_game") {
                const newPlayer: plr = Object.assign(socket, { cards: [], hasStarted: false });
               if(this.pendingPlayers.length<=5){
                this.pendingPlayers.push(newPlayer);
               } else {
                    if(this.pendingPlayers.length<3){
                        console.log(`Waiting for more players: ${this.pendingPlayers.length}`);
                    }else{
                        console.log(`send  join to init game `)
                    }
                }
            }
            
            if(messageData.type==="join"){
                //this is where the game actually initiated >>
                 const game = new Game(this.pendingPlayers);
                    this.games.push(game);
                    this.pendingPlayers = [];

                    for (const player of game.Players) {
                        player.send(JSON.stringify({
                            msg: "Game initialized. Please send 'start' to begin."
                        }));
                    }
            }
            
            if (messageData.type === "start") {
                const currentPlayer = this.findPlayerInGames(socket);
                if (currentPlayer) {
                    currentPlayer.hasStarted = true;

                    const currGame = this.findGameByPlayer(socket);
                    if (currGame && currGame.allPlayersStarted()) {
                        const shuffledCardsArr = DistributingCards(currGame.Players.length, flatten_Cards);
                        for (let i = 0; i < currGame.Players.length; i++) {
                            currGame.Players[i].cards = shuffledCardsArr.playerArrays[i];
                            currGame.remainingCards=shuffledCardsArr.remainingElements;
                            currGame.Jockey=getJockey(currGame.remainingCards)
                            // console.log(`inside start ${currGame.remainingCards}`);
                            // console.log(`players after start${currGame.Players}`)
                            currGame.Players[i].send(JSON.stringify({
                                msg: `Your cards: ${JSON.stringify(currGame.Players[i].cards)}`,
                                remainingCards:`remaining Cards : ${JSON.stringify(currGame.remainingCards)}`,
                                Jockey:`the Jockey of The Game ${currGame.Jockey}`
                            }));

                        }
                    }
                }
            }
        });
    }

    private findPlayerInGames(socket: WebSocket): plr | undefined {
        for (const game of this.games) {
            for (const player of game.Players) {
                if (player === socket) {
                    return player;
                }
            }
        }
        return undefined;
    }

    private findGameByPlayer(socket: WebSocket): Game | undefined {
        for (const game of this.games) {
            if (game.Players.some(player => player === socket)) {
                return game;
            }
        }
        return undefined;
    }
}
