
// import { DistributingCards, flatten_Cards, getJockey, setValidator } from "../GameMechanics";
// import { Game, plr } from "./Game";
// import WebSocket from "ws";
// import { card } from "../CardsAll";

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
//             let messageData;
//             try {
//                 messageData = JSON.parse(data.toString());
//             } catch (error) {
//                 console.error("Failed to parse message data:", error);
//                 return;
//             }

//             console.log(messageData);
//             const { type, set, card } = messageData;
//             const currentPlayer = this.findPlayerInGame(socket);
//             const currGame = this.findGameByPlayerSocket(socket);

//             if (currGame && currentPlayer) {
//                 if (currentPlayer !== currGame.getCurrentPlayer() && type !== "start" && type !== "showSet") {
//                     currentPlayer.send(JSON.stringify({ msg: "It's not your turn!" }));
//                     return;
//                 }

//                 switch (type) {
//                     case "init_game":
//                         this.handleInitGame(socket);
//                         break;
//                     case "join":
//                         this.handleJoinGame(socket);
//                         break;
//                     case "start":
//                         this.handleStartGame(socket);
//                         break;
//                     case "takefromrem":
//                         if (!currGame.isAwaitingGiveBack()) {
//                             this.handleTakeFromRem(socket);
//                             currGame.setAwaitingGiveBack(true);
//                         } else {
//                             currentPlayer.send(JSON.stringify({ msg: "You need to give back a card first!" }));
//                         }
//                         break;
//                     case "takefromgb":
//                         if (!currGame.isAwaitingGiveBack()) {
//                             this.handleTakeFromGb(socket);
//                             currGame.setAwaitingGiveBack(true);
//                         } else {
//                             currentPlayer.send(JSON.stringify({ msg: "You need to give back a card first!" }));
//                         }
//                         break;
//                     case "showSet":
//                         this.handleShowSet(socket, set);
//                         break;
//                     case "giveback":
//                         if (currGame.isAwaitingGiveBack() && card) {
//                             this.handleGiveBack(socket, card);
//                             currGame.incrementMoveCount();
//                         } else {
//                             currentPlayer.send(JSON.stringify({ msg: "You need to take a card first!" }));
//                         }
//                         break;
//                     default:
//                         console.log("Unknown message type:", type);
//                 }
//             } else {
//                 switch (type) {
//                     case "init_game":
//                         this.handleInitGame(socket);
//                         break;
//                     case "join":
//                         this.handleJoinGame(socket);
//                         break;
//                     default:
//                         console.log("Unknown message type:", type);
//                 }
//             }
//         });
//     }

//     private handleInitGame(socket: WebSocket) {
//         const newPlayer: plr = Object.assign(socket, { cards: [], hasStarted: false });
//         this.pendingPlayers.push(newPlayer);
//         console.log(`Player added. Total pending players: ${this.pendingPlayers.length}`);
//     }

//     private handleJoinGame(socket: WebSocket) {
//         if (this.pendingPlayers.length >= 3) {
//             const game = new Game(this.pendingPlayers);
//             this.games.push(game);
//             this.pendingPlayers = [];
//             for (const player of game.Players) {
//                 player.send(JSON.stringify({ msg: "Game initialized. Please send 'start' to begin." }));
//             }
//         } else {
//             socket.send(JSON.stringify({ msg: "Not enough players to start the game. Please wait for more players to join." }));
//         }
//     }

//     private handleStartGame(socket: WebSocket) {
//         const currentPlayer = this.findPlayerInGame(socket);
//         if (currentPlayer) {
//             currentPlayer.hasStarted = true;
//             const currGame = this.findGameByPlayerSocket(socket);
//             if (currGame && currGame.allPlayersStarted()) {
//                 const shuffledCardsArr = DistributingCards(currGame.Players.length, flatten_Cards);
//                 currGame.remainingCards = shuffledCardsArr.remainingElements;
//                 currGame.Jockey = getJockey(currGame.remainingCards);
//                 currGame.board.leftOutCards = shuffledCardsArr.remainingElements.slice(0, -1);
//                 for (let i = 0; i < currGame.Players.length; i++) {
//                     currGame.Players[i].cards = shuffledCardsArr.playerArrays[i];
//                     currGame.Players[i].send(JSON.stringify({
//                         type:"start",
//                         msg: currGame.Players[i].cards,
//                         remainingCards:currGame.board.leftOutCards,
//                         Jockey: `The Jockey of The Game: ${currGame.Jockey}`
//                     }));
//                 }
//             }
//         }
//     }

//     private handleTakeFromRem(socket: WebSocket) {
//         const currentPlayer = this.findPlayerInGame(socket);
//         const currGame = this.findGameByPlayerSocket(socket);
//         if (currGame && currentPlayer) {
//             const card = currGame.board.leftOutCards.pop();
//             if (card) {
//                 currentPlayer.cards.push(card);
//                 currentPlayer.send(JSON.stringify({ msg: `I'm taking this card: ${JSON.stringify(card)}` }));
//                 currentPlayer.send(JSON.stringify({
//                     type:"takeRemRes",
//                     msg: currentPlayer.cards,
//                     nowRem:currGame.board.leftOutCards,
//                     action: "giveback"

//                 }));
//             } else {
//                 console.log("No cards left in the deck.");
//             }
//         }
//     }

//     private handleTakeFromGb(socket: WebSocket) {
//         const currentPlayer = this.findPlayerInGame(socket);
//         const currGame = this.findGameByPlayerSocket(socket);
//         if (currGame && currentPlayer) {
//             const card = currGame.board.givenBackCards.pop();
//             if (card) {
//                 currentPlayer.cards.push(card);
//                 currentPlayer.send(JSON.stringify({ msg: `I'm taking this card: ${JSON.stringify(card)}` }));
//                 currentPlayer.send(JSON.stringify({
//                     type:"takeGbRes",
//                     msg: currentPlayer.cards,
//                     action: "giveback"
//                 }));
//             } else {
//                 console.log("No cards left in the given-back deck.");
//             }
//         }
//     }

//     private handleShowSet(socket: WebSocket, set: card[]) {
//         if (setValidator(set)) {
//             const currGame = this.findGameByPlayerSocket(socket);
//             const currentPlayer = this.findPlayerInGame(socket);
//             currGame?.board.validSets.push(set);
//             currentPlayer?.send(JSON.stringify({ msg: `Look, this is the set: ${JSON.stringify(set)}` }));
//         }
//     }

//     private handleGiveBack(socket: WebSocket, card: card) {
//         const currentPlayer = this.findPlayerInGame(socket);
//         const currGame = this.findGameByPlayerSocket(socket);
//         if (currentPlayer && currGame) {
//             currentPlayer.cards = currentPlayer.cards.filter(c => c.key !== card.key || c.card !== card.card);
//             currGame.board.givenBackCards.push(card);
//             currentPlayer.send(JSON.stringify({ msg: `I'm giving this card back: ${JSON.stringify(card)}` }));
//             currentPlayer.send(JSON.stringify({
//                 type:"aftergb",
//                 msg: currentPlayer.cards,
//                 givenBacks:currGame.board.givenBackCards
//             }));
//         }
//     }

//     private findPlayerInGame(socket: WebSocket): plr | undefined {
//         for (const game of this.games) {
//             for (const player of game.Players) {
//                 if (player === socket) {
//                     return player;
//                 }
//             }
//         }
//         return undefined;
//     }

//     private findGameByPlayerSocket(socket: WebSocket): Game | undefined {
//         for (const game of this.games) {
//             if (game.Players.some(player => player === socket)) {
//                 return game;
//             }
//         }
//         return undefined;
//     }
// }


import { DistributingCards, flatten_Cards, getJockey, setValidator } from "../GameMechanics";
import { Game, plr } from "./Game";
import WebSocket from "ws";
import { card } from "../CardsAll";

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
            let messageData;
            try {
                messageData = JSON.parse(data.toString());
            } catch (error) {
                console.error("Failed to parse message data:", error);
                return;
            }

            console.log(messageData);
            const { type, set, card } = messageData;
            const currentPlayer = this.findPlayerInGame(socket);
            const currGame = this.findGameByPlayerSocket(socket);

            if (currGame && currentPlayer) {
                if (currentPlayer !== currGame.getCurrentPlayer() && type !== "start" && type !== "showSet") {
                    currentPlayer.send(JSON.stringify({ msg: "It's not your turn!" }));
                    return;
                }

                switch (type) {
                    case "init_game":
                        this.handleInitGame(socket);
                        break;
                    case "join":
                        this.handleJoinGame(socket);
                        break;
                    case "start":
                        this.handleStartGame(socket);
                        break;
                    case "takefromrem":
                        if (!currGame.isAwaitingGiveBack()) {
                            this.handleTakeFromRem(socket);
                            currGame.setAwaitingGiveBack(true);
                        } else {
                            currentPlayer.send(JSON.stringify({ msg: "You need to give back a card first!" }));
                        }
                        break;
                    case "takefromgb":
                        if (!currGame.isAwaitingGiveBack()) {
                            this.handleTakeFromGb(socket);
                            currGame.setAwaitingGiveBack(true);
                        } else {
                            currentPlayer.send(JSON.stringify({ msg: "You need to give back a card first!" }));
                        }
                        break;
                    case "showSet":
                        this.handleShowSet(socket, set);
                        break;
                    case "giveback":
                        if (currGame.isAwaitingGiveBack() && card) {
                            this.handleGiveBack(socket, card);
                            currGame.incrementMoveCount();
                        } else {
                            currentPlayer.send(JSON.stringify({ msg: "You need to take a card first!" }));
                        }
                        break;
                        case "leaveCard":   
                                this.handleLeaveCard(socket);
                                currGame.incrementMoveCount();
                            break;
                    default:
                        console.log("Unknown message type:", type);
                }
            } else {
                switch (type) {
                    case "init_game":
                        this.handleInitGame(socket);
                        break;
                    case "join":
                        this.handleJoinGame(socket);
                        break;
                    default:
                        console.log("Unknown message type:", type);
                }
            }
        });
    }

    private handleInitGame(socket: WebSocket) {
        const newPlayer: plr = Object.assign(socket, { cards: [], hasStarted: false });
        this.pendingPlayers.push(newPlayer);
        console.log(`Player added. Total pending players: ${this.pendingPlayers.length}`);
    }

    private handleJoinGame(socket: WebSocket) {
        if (this.pendingPlayers.length >= 3) {
            const game = new Game(this.pendingPlayers);
            this.games.push(game);
            this.pendingPlayers = [];
            for (const player of game.Players) {
                player.send(JSON.stringify({ msg: "Game initialized. Please send 'start' to begin." }));
            }
        } else {
            socket.send(JSON.stringify({ msg: "Not enough players to start the game. Please wait for more players to join." }));
        }
    }

    private handleStartGame(socket: WebSocket) {
        const currentPlayer = this.findPlayerInGame(socket);
        if (currentPlayer) {
            currentPlayer.hasStarted = true;
            const currGame = this.findGameByPlayerSocket(socket);
            if (currGame && currGame.allPlayersStarted()) {
                const shuffledCardsArr = DistributingCards(currGame.Players.length, flatten_Cards);
                currGame.remainingCards = shuffledCardsArr.remainingElements;
                currGame.Jockey = getJockey(currGame.remainingCards);
                currGame.board.leftOutCards = shuffledCardsArr.remainingElements.slice(0, -1);
                for (let i = 0; i < currGame.Players.length; i++) {
                    currGame.Players[i].cards = shuffledCardsArr.playerArrays[i];
                    currGame.Players[i].send(JSON.stringify({
                        type: "start",
                        msg: currGame.Players[i].cards,
                        remainingCards: currGame.board.leftOutCards,
                        Jockey: `The Jockey of The Game: ${currGame.Jockey}`
                    }));
                }
                this.broadcastGameState(currGame);
            }
        }
    }

    private handleTakeFromRem(socket: WebSocket) {
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);
        if (currGame && currentPlayer) {
            const card = currGame.board.leftOutCards.pop();
            if (card) {
                currentPlayer.cards.push(card);
                currentPlayer.send(JSON.stringify({ msg: `I'm taking this card: ${JSON.stringify(card)}` }));
                currentPlayer.send(JSON.stringify({
                    type: "takeRemRes",
                    msg: currentPlayer.cards,
                    nowRem: currGame.board.leftOutCards,
                    action: "giveback"
                }));
                this.broadcastGameState(currGame);
            } else {
                console.log("No cards left in the deck.");
            }
        }
    }

    private handleTakeFromGb(socket: WebSocket) {
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);
        if (currGame && currentPlayer) {
            const card = currGame.board.givenBackCards.pop();
            if (card) {
                currentPlayer.cards.push(card);
                currentPlayer.send(JSON.stringify({ msg: `I'm taking this card: ${JSON.stringify(card)}` }));
                currentPlayer.send(JSON.stringify({
                    type: "takeGbRes",
                    msg: currentPlayer.cards,
                    action: "giveback"
                }));
                this.broadcastGameState(currGame);
            } else {
                console.log("No cards left in the given-back deck.");
            }
        }
    }

    private handleShowSet(socket: WebSocket, set: card[]) {
        if (setValidator(set)) {
            const currGame = this.findGameByPlayerSocket(socket);
            const currentPlayer = this.findPlayerInGame(socket);
            currGame?.board.validSets.push(set);
            currentPlayer?.send(JSON.stringify({ msg: `Look, this is the set: ${JSON.stringify(set)}` }));
            if(currGame){
                
            }
        }
    }

    private handleGiveBack(socket: WebSocket, card: card) {
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);
        if (currentPlayer && currGame) {
            console.log("Received giveback message:", card); // Add this line
            currentPlayer.cards = currentPlayer.cards.filter(c => c.key !== card.key || c.card !== card.card);
            currGame.board.givenBackCards.push(card);
            currentPlayer.send(JSON.stringify({ msg: `I'm giving this card back: ${JSON.stringify(card)}` }));
            currentPlayer.send(JSON.stringify({
                type: "aftergb",
                msg: currentPlayer.cards,
                givenBacks: currGame.board.givenBackCards
            }));
            this.broadcastGameState(currGame);
        }
    }
    
    private handleLeaveCard(socket: WebSocket){
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);
        if (currentPlayer && currGame) {
            // currentPlayer.cards = currentPlayer.cards.filter(c => c.key !== card.key || c.card !== card.card);
            const this_card=currGame.board.leftOutCards.pop();
            if(this_card){
                currGame.board.givenBackCards.push(this_card);
            }
            currentPlayer.send(JSON.stringify({ msg: `I'm giving this card back: ${JSON.stringify(this_card)}` }));
            currentPlayer.send(JSON.stringify({
                type: "afterleave",
                msg: currentPlayer.cards,
                givenBacks: currGame.board.givenBackCards
            }));
            this.broadcastGameState(currGame);
        }
    }
    private broadcastGameState(game: Game) {
        const gameState = {
            type: "gameStateUpdate",
            remainingCards: game.board.leftOutCards,
            givenBackCards: game.board.givenBackCards
        };
        for (const player of game.Players) {
            player.send(JSON.stringify(gameState));
        }
    }

    private findPlayerInGame(socket: WebSocket): plr | undefined {
        for (const game of this.games) {
            for (const player of game.Players) {
                if (player === socket) {
                    return player;
                }
            }
        }
        return undefined;
    }

    private findGameByPlayerSocket(socket: WebSocket): Game | undefined {
        for (const game of this.games) {
            if (game.Players.some(player => player === socket)) {
                return game;
            }
        }
        return undefined;
    }
}
