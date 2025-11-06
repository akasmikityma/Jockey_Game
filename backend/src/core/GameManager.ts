
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
//         console.log(`. Total pending players: ${this.pendingPlayers.length}`);
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
// -------------------------------------------------------------------------------------------------------------------------------------

/// <reference types="node" />
/// <reference types="ws" />

import { JustShuffle } from "../GameMechanics";
import { DistributingCards, getJockey} from "../GameMechanics";
import { isWildcardSubarray } from "../setValidatorPro";
import { Game, plr } from "./Game";
import WebSocket from "ws";
import { card } from "../CardsAll";
// import { json } from "stream/consumers";

export class GameManager {
    private games: Game[];
    private pendingPlayers: plr[];
    private users: WebSocket[];
    private playerToGameMap : Map<string,Game>
    private disconnectedPlayers: Map<string,plr>;
    private socketMetadata: Map<WebSocket, { playerId: string }>;
    private reconnectionQueue:Map<string,number>;
    constructor() {
        this.games = [];
        this.pendingPlayers = [];
        this.users = [];
        this.playerToGameMap = new Map();
        this.disconnectedPlayers = new Map();
        this.socketMetadata = new Map();
        this.reconnectionQueue = new Map();
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        this.socketMetadata.delete(socket); 
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
            const { type, set, card ,name,playerId} = messageData;
            if(type==="reconnect"){
                this.handleReconnection(socket,playerId)
                return
            }
            
            const turnBasedActions = [
                "takefromrem", 
                "takefromgb", 
                "giveback", 
                "leaveCard", 
                "leaveFormGB",
                "addCardtoSet",
                "showSet"
            ]

            if(turnBasedActions.includes(type)){
                if(!this.isPlayersTurn(socket,type)){
                    return;
                }
            }

            const currentPlayer = this.findPlayerInGame(socket);
            const currGame = this.findGameByPlayerSocket(socket);

            if (currGame && currentPlayer) {
                if (currentPlayer !== currGame.getCurrentPlayer() && type !== "start" && type !== "showSet") {
                    currentPlayer.send(JSON.stringify({ msg: "It's not your turn!" }));
                    return;
                }

                switch (type) {
                    case "init_game":
                        console.log("lets handle the init_game case ")
                        this.handleInitGame(socket,name);
                        break;
                    case "join":
                        console.log("lets handle the join case ")
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
                        // currGame.incrementMoveCount()
                        break;
                    case "giveback":
                        if (currGame.isAwaitingGiveBack() && card) {
                            this.handleGiveBack(socket, card);
                            currGame.incrementMoveCount();
                            this.handleTurnOver(currGame)
                        } else {
                            currentPlayer.send(JSON.stringify({ msg: "You need to take a card first!" }));
                        }
                        break;
                    case "leaveCard":   
                            this.handleLeaveCard(socket);
                            currGame.incrementMoveCount();
                            this.handleTurnOver(currGame)
                        break;
                    case "leaveFormGB":
                        this.handleLeaveCardfromGB(socket);
                        currGame.incrementMoveCount();
                        this.handleTurnOver(currGame)
                        break;
                    case "addCardtoSet":
                        this.handleAddCardToset(socket,set);
                        // currGame.incrementMoveCount();
                        break;
                    case "moveOver":
                        currGame.incrementMoveCount();
                        this.handleTurnOver(currGame)
                        break;
                    case "leaveGame":
                        this.handleLeaveGame(socket);
                        break;
                    case "JoinNewGame":
                        this.handleInitGame(socket,name);
                        break;
                    default:
                        console.log("Unknown message type:", type);
                }
            } else {
                switch (type) {
                    case "init_game":
                        this.handleInitGame(socket,name);
                        break;
                    case "join":
                        this.handleJoinGame(socket);
                        break;
                    default:
                        console.log("Unknown message type:", type);
                }
            }
        });
        socket.on("close", () => {
            console.log("WebSocket connection closed");
            this.handleDisconnection(socket); // Ensure this is called
        });
    }
    
    private handleTurnOver(game: Game) {
        game.nextPlayer(); // Move to the next player
        game.notifyCurrentPlayer(); // Notify the new current player
        this.broadcastGameState(game); // Optionally broadcast the new game state
    }

    //  Reconnection Logic : ----------------

    // private handleReconnection(newSocket: WebSocket, playerId: string) {
    //     console.log("Attempting reconnection for playerId:", playerId);
        
    //     const attempts = (this.reconnectionQueue.get(playerId)||0)+1;
    //     this.reconnectionQueue.set(playerId,attempts);
    //     console.log(`Reconnection attempt #${attempts} for player ${playerId}`);
        
    //     // Look up the disconnected player by playerId.
    //     const disconnectedPlayer = this.disconnectedPlayers.get(playerId);
        
    //     if (disconnectedPlayer) {
    //         console.log("Disconnected found:", disconnectedPlayer.name);
            
    //         // Option 1: If your player object is stored as a WebSocket object (or extends it)
    //         // you cannot replace the socket via Object.assign. Instead, update methods as needed.
    //         // For example, update the player's send method and update socketMetadata:
    //         disconnectedPlayer.send = newSocket.send.bind(newSocket);
            
    //         // Now, update the socketMetadata for the new socket.
    //         this.socketMetadata.set(newSocket, { playerId });
            
            
    //         //Clear the reconnection attemps >> 
    //         this.reconnectionQueue.delete(playerId);
    //         // Remove from disconnectedPlayers.
    //         this.disconnectedPlayers.delete(playerId);

    //         // Update the player reference in the game.
    //         const game = this.playerToGameMap.get(playerId);
    //         if (game) {
    //             const playerIndex = game.Players.findIndex(p => p.playerId === playerId);
    //             if (playerIndex !== -1) {
    //                 game.Players[playerIndex] = disconnectedPlayer;
    //             }
                
    //             // Send updated game state back to the client.
    //             newSocket.send(JSON.stringify({
    //                 type: "reconnect",
    //                 msg: "You have reconnected to the game.",
    //                 gameState: {
    //                     remainingCards: game.board.leftOutCards,
    //                     givenBackCards: game.board.givenBackCards,
    //                     validSets: game.board.validSets,
    //                     cards: disconnectedPlayer.cards,
    //                     currentPlayer: game.getCurrentPlayer().playerId,
    //                     winner: game.Winner
    //                 }
    //             }));
    //             console.log(`Player with playerId ${playerId} reconnected`);
    //         } else {
    //             console.log(`Game not found for playerId ${playerId}`);
    //         }
    //     } else {
    //         newSocket.send(JSON.stringify({
    //             type: "error",
    //             msg: "Reconnection failed. Player not found."
    //         }));
    //     }
    // }
    private handleReconnection(newSocket: WebSocket, playerId: string) {
        console.log(`Attempting reconnection for playerId: ${playerId} at ${new Date().toISOString()}`);
        
        // Check if player is in disconnectedPlayers
        const disconnectedPlayer = this.disconnectedPlayers.get(playerId);
        if (!disconnectedPlayer) {
            console.log(`Player ${playerId} not found in disconnectedPlayers map`);
            console.log(`Current disconnected players: ${Array.from(this.disconnectedPlayers.keys()).join(', ')}`);
            newSocket.send(JSON.stringify({
                type: "error",
                msg: "Reconnection failed. Player not found or grace period expired."
            }));
            return;
        }

        console.log(`Found disconnected player: ${disconnectedPlayer.name}`);
        
        // Get the game before updating player references
        const game = this.playerToGameMap.get(playerId);
        if (!game) {
            console.log(`No game found for player ${playerId}`);
            newSocket.send(JSON.stringify({
                type: "error",
                msg: "Game not found for reconnection."
            }));
            return;
        }

        try {
            // Update socket references
            disconnectedPlayer.send = newSocket.send.bind(newSocket);
            this.socketMetadata.set(newSocket, { playerId });
            
            // Update player in game
            const playerIndex = game.Players.findIndex(p => p.playerId === playerId);
            if (playerIndex !== -1) {
                game.Players[playerIndex] = disconnectedPlayer;
                console.log(`Updated player reference in game for ${disconnectedPlayer.name}`);
            }

            // Remove from disconnected players
            this.disconnectedPlayers.delete(playerId);
            
            // Send game state
            newSocket.send(JSON.stringify({
                type: "reconnect",
                msg: "Successfully reconnected to game",
                gameState: {
                    remainingCards: game.board.leftOutCards,
                    givenBackCards: game.board.givenBackCards,
                    validSets: game.board.validSets,
                    cards: disconnectedPlayer.cards,
                    currentPlayer: game.getCurrentPlayer().playerId,
                    winner: game.Winner
                }
            }));

            console.log(`Successfully reconnected player ${disconnectedPlayer.name}`);
        } catch (error) {
            console.error(`Error during reconnection for player ${playerId}:`, error);
            newSocket.send(JSON.stringify({
                type: "error",
                msg: "Internal error during reconnection."
            }));
        }
    }
    // DisConnection logic >> 
   private handleDisconnection(socket: WebSocket) {
    const player = this.findPlayerInGame(socket);
    if (player) {
        console.log(`Player ${player.name} with id ${player.playerId} disconnected`);
        this.disconnectedPlayers.set(player.playerId, player); // Add to disconnectedPlayers map
        console.log("Disconnected players map:", this.disconnectedPlayers);

        const game = this.findGameByPlayerSocket(socket);
        if (game) {
            this.playerToGameMap.set(player.playerId, game); // Map playerId to game
        } else {
            console.log(`Game not found for player ${player.name}`);
        }

        const RECONNECT_GRACE_PERIOD = 5 * 60 * 1000; 
        // Grace period for reconnection
        setTimeout(() => {
            if (this.disconnectedPlayers.has(player.playerId)) {
                console.log(`Player ${player.name} did not reconnect in time`);
                const game = this.playerToGameMap.get(player.playerId);
                if (game) {
                    game.Players = game.Players.filter(p => p.playerId !== player.playerId);
                    this.playerToGameMap.delete(player.playerId);
                }
                this.disconnectedPlayers.delete(player.playerId);
            }
            }, RECONNECT_GRACE_PERIOD); // 30 seconds grace period
        } else {
            console.log("Player not found in any game during disconnection");
        }
    }

    private handleInitGame(socket: WebSocket,name:string) {
        const playerId = this.generatePlayerId();
        this.socketMetadata.set(socket, { playerId }); 
        const newPlayer: plr = Object.assign(socket, { 
            name:name,
            cards: [],
            hasStarted: false,
            valids:[] ,
            playerId:playerId});
        this.pendingPlayers.push(newPlayer);
        console.log(` with name: ${newPlayer.name} and playerId ${playerId} Total pending players: ${this.pendingPlayers.length}`);
        socket.send(JSON.stringify({
            type:"playerId",
            playerId
        }))
        newPlayer.send(JSON.stringify({
            type:"playerId",
            playerId
        }))

        // i definitely dont need to have send for both the socket and the newPlayer 
        // its more or less same >> its just that i dont know which one is working 
    }
    private generatePlayerId():string{
        return Math.random().toString(36).substring(2, 9); 
    }
    private handleJoinGame(socket: WebSocket) {
        console.log("inside the handleJoingame method");
        if (this.pendingPlayers.length >= 3) {
            const game = new Game(this.pendingPlayers);
            this.games.push(game);
            this.pendingPlayers = [];
            for (const player of game.Players) {
                this.playerToGameMap.set(player.playerId,game);
                player.send(JSON.stringify({ type:"join",msg: "Game initialized. Please send 'start' to begin.",
                    noOFplayers:game.Players.length,
                 }));
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
                // Use the game's own deck
                const gameDeck = currGame.getGameDeck();
                console.log("Starting new game with fresh deck of size:", gameDeck.length);
                
                const shuffledCardsArr = DistributingCards(currGame.Players.length, gameDeck);
                
                console.log("After distribution:");
                console.log("Players:", currGame.Players.length);
                console.log("Cards per player:", shuffledCardsArr.playerArrays.map(arr => arr.length));
                console.log("Remaining cards:", shuffledCardsArr.remainingElements.length);
    
                currGame.remainingCards = shuffledCardsArr.remainingElements;
                const decider = getJockey(currGame.remainingCards).lastCard;
                currGame.Jockey = getJockey(currGame.remainingCards).Jockey;
    
                currGame.board.leftOutCards = shuffledCardsArr.remainingElements.slice(0, -1);
                
                for (let i = 0; i < currGame.Players.length; i++) {
                    currGame.Players[i].cards = shuffledCardsArr.playerArrays[i];
                    currGame.Players[i].send(JSON.stringify({
                        type: "start",
                        msg: currGame.Players[i].cards,
                        remainingCards: currGame.board.leftOutCards,
                        JockyDecider: decider,
                        Jockey: currGame.Jockey,
                        totalplayers: currGame.Players.length
                    }));
                }
                
                this.broadcastGameState(currGame);
            }else {
                // Notify the current player to wait for others to start
                currentPlayer.send(JSON.stringify({
                    msg: "Waiting for all players to start the game. Please wait for others to send 'start'."
                }));
            }
        }
    }
    private handleTakeFromRem(socket: WebSocket) {
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);
        if (currGame && currentPlayer) {
            if (currGame.board.leftOutCards.length === 0) {
                // Replenish the deck from givenBackCards
                const newRemainings = JustShuffle(currGame.board.givenBackCards);
                currGame.board.leftOutCards = newRemainings;
                currGame.board.givenBackCards = [];
            }
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
        const currGame = this.findGameByPlayerSocket(socket);
        const currentPlayer = this.findPlayerInGame(socket);
        //@ts-ignore
        if (isWildcardSubarray(set,currGame?.Jockey)) {
            if(currentPlayer && currGame){
                //valid set ke player in hands cards gulo theke baad dite hobe >>
                const validImages = new Set(set.map((card: card) => card.image));
                const restINHads =currentPlayer.cards.filter(item=>!validImages.has(item.image))
                console.log(JSON.stringify(restINHads))
                currentPlayer.cards=restINHads;
                if(currentPlayer.cards.length===0){
                    currGame.Winner=currentPlayer.name
                }
                console.log(`now the rest cards :${restINHads}`)
                currentPlayer.valids=set
            currGame?.board.validSets.push(set);
            currentPlayer?.send(JSON.stringify({
                type:"showRes",
                cardsleftIn_hands:currentPlayer.cards,
                valids:currentPlayer.valids,
                allValids:currGame?.board.validSets
            }));
            this.broadcastGameState(currGame)
        
        }
            // if(currGame){
                
            // }
        }else{
          currentPlayer?.send(JSON.stringify({
            msg:`the set is not valid`
          }))
        }
    }

    private handleAddCardToset(socket: WebSocket, set: card[]) {
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);
    
        if (currGame && currentPlayer) {
            if (!set || !Array.isArray(set)) {
                console.error('Invalid set passed to handleAddCardToset:', set);
                return;
            }
    
            // @ts-ignore
            if (isWildcardSubarray(set, currGame?.Jockey)) {
                const mainArr = currGame.board.validSets;
                const another = set;
    
                console.log('Original valid sets:', JSON.stringify(mainArr));
                console.log('New set to add:', JSON.stringify(another));
    
                const Updated_valid_sets = mainArr?.map(subarr => {
                    const hasCard = subarr.some(item => another.some(newItem => newItem.image === item.image));
                    return hasCard ? another : subarr;
                });
    
                console.log('Updated valid sets:', JSON.stringify(Updated_valid_sets));
    
                currGame.board.validSets = Updated_valid_sets;
    
                const validImages = new Set(set.map((card: card) => card.image));
                const restINHads = currentPlayer.cards.filter(item => !validImages.has(item.image));
                console.log(JSON.stringify(restINHads))
                currentPlayer.cards = restINHads;
                if(currentPlayer.cards.length===0){
                    currGame.Winner=currentPlayer.name
                }
    
                currentPlayer.send(JSON.stringify({
                    type: "addCardRes",
                    cardsleftIn_hands: currentPlayer.cards,
                    valids: currentPlayer.valids,
                    allValids: currGame.board.validSets
                }));
    
                this.broadcastGameState(currGame);
            
            } else {
                currentPlayer.send(JSON.stringify({
                    msg: "the set is not valid in either the arrangement or Jockey is not valid"
                }));
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
            if(currGame.board.leftOutCards.length===0){
                currGame.board.leftOutCards=currGame.board.givenBackCards;
                currGame.board.givenBackCards=[]
            }
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

    private handleLeaveCardfromGB(socket: WebSocket){
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);
        if (currentPlayer && currGame) {
            // currentPlayer.cards = currentPlayer.cards.filter(c => c.key !== card.key || c.card !== card.card);
           
            currentPlayer.send(JSON.stringify({ msg: `I'm giving this card back: ${JSON.stringify(currGame.board.givenBackCards[currGame.board.givenBackCards.length-1])}` }));
            currentPlayer.send(JSON.stringify({
                type: "afterleavefromGB",
                msg: currentPlayer.cards,
                givenBacks: currGame.board.givenBackCards
            }));
            this.broadcastGameState(currGame);
        }
    }

    private broadcastGameState(game: Game) {
        const currentPlayer = game.getCurrentPlayer();
        console.log("valid current players name ",currentPlayer.name," and playerId ",currentPlayer.playerId)
        const gameState = {
            type: "gameStateUpdate",
            remainingCards: game.board.leftOutCards,
            givenBackCards: game.board.givenBackCards,
            validSets: game.board.validSets,
            Winner: game.Winner,
            currentPlayer: currentPlayer?.playerId,
            currentPlayerName: currentPlayer?.name
        };
        
        for (const player of game.Players) {
            player.send(JSON.stringify(gameState));
        }
    }
    private isPlayersTurn(socket : WebSocket,action:string):boolean{
        const currentPlayer = this.findPlayerInGame(socket);
        const currGame = this.findGameByPlayerSocket(socket);

        if(!currGame || !currentPlayer){
            return false;
        }
        const player_who_has_Current_turn = currGame.getCurrentPlayer();
        if(currentPlayer !== player_who_has_Current_turn){
            currentPlayer.send(JSON.stringify({
                type : "notYourTurn",
                msg:`Please wait for your turn! Currently ${player_who_has_Current_turn}`,
                action: action
            }))
        }

        return true;
    }
    private findPlayerInGame(socket: WebSocket): plr | undefined {
        // Ensure the incoming socket has the playerId attached.
        // You might attach it in onopen like: socket.playerId = localStorage.getItem("playerId")
        
        const meta = this.socketMetadata.get(socket);

        if(!meta){
            console.log("no metadata available for the socket ");
            return undefined;
        }
        for (const game of this.games) {
            for (const player of game.Players) {
                if (player.playerId === meta.playerId) {
                    console.log(`Player found in game: ${player.name}`);
                    return player;
                }
            }
        }
        console.log("Player not found in any game");
        return undefined;
    }

    private findGameByPlayerSocket(socket: WebSocket): Game | undefined {
        const meta = this.socketMetadata.get(socket);
        if (!meta) {
            console.log("No metadata found on socket");
            return undefined;
        }

        const game = this.playerToGameMap.get(meta.playerId);
        if (game) return game;
        for (const game of this.games) {
            if (game.Players.some(player => player.playerId === meta.playerId)) {
                return game;
            }
        }
        return undefined;
    }

    private handleLeaveGame(socket: WebSocket) {
        const meta = this.socketMetadata.get(socket);
        if (!meta) return;

        // Clean up all references
        const game = this.playerToGameMap.get(meta.playerId);
        if (game) {
            game.Players = game.Players.filter(p => p.playerId !== meta.playerId);
            this.playerToGameMap.delete(meta.playerId);
        }
        
        this.disconnectedPlayers.delete(meta.playerId);
        this.socketMetadata.delete(socket);

        // Allow player to join new game
        socket.send(JSON.stringify({
            type: "gameLeft",
            msg: "You've left the game. You can now join a new one."
        }));
    } 
}
