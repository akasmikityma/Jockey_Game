
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
// -------------------------------------------------------------------------------------------------------------------------------------

/// <reference types="node" />
/// <reference types="ws" />


import { JustShuffle } from "../GameMechanics";
import { DistributingCards, flatten_Cards, getJockey, setValidator } from "../GameMechanics";
import { isWildcardSubarray } from "../setValidatorPro";
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
            const { type, set, card ,name} = messageData;
            const currentPlayer = this.findPlayerInGame(socket);
            const currGame = this.findGameByPlayerSocket(socket);

            if (currGame && currentPlayer) {
                if (currentPlayer !== currGame.getCurrentPlayer() && type !== "start" && type !== "showSet") {
                    currentPlayer.send(JSON.stringify({ msg: "It's not your turn!" }));
                    return;
                }

                switch (type) {
                    case "init_game":
                        this.handleInitGame(socket,name);
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
    }
    
    private handleTurnOver(game: Game) {
        game.nextPlayer(); // Move to the next player
        game.notifyCurrentPlayer(); // Notify the new current player
        this.broadcastGameState(game); // Optionally broadcast the new game state
    }

    private handleInitGame(socket: WebSocket,name:string) {
        const newPlayer: plr = Object.assign(socket, { name:name,cards: [], hasStarted: false ,valids:[]});
        this.pendingPlayers.push(newPlayer);
        console.log(`Player added with name: ${newPlayer.name}. Total pending players: ${this.pendingPlayers.length}`);
    }

    private handleJoinGame(socket: WebSocket) {
        if (this.pendingPlayers.length >= 3) {
            const game = new Game(this.pendingPlayers);
            this.games.push(game);
            this.pendingPlayers = [];
            for (const player of game.Players) {
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
                const shuffledCardsArr = DistributingCards(currGame.Players.length, flatten_Cards);
                currGame.remainingCards = shuffledCardsArr.remainingElements;
                const decider=getJockey(currGame.remainingCards).lastCard
                currGame.Jockey = getJockey(currGame.remainingCards).Jockey;
                console.log(currGame.Jockey)
               
                currGame.board.leftOutCards = shuffledCardsArr.remainingElements.slice(0, -1);
                for (let i = 0; i < currGame.Players.length; i++) {
                    currGame.Players[i].cards = shuffledCardsArr.playerArrays[i];
                    currGame.Players[i].send(JSON.stringify({
                        type: "start",
                        msg: currGame.Players[i].cards,
                        remainingCards: currGame.board.leftOutCards,
                        JockyDecider:decider,
                        Jockey: currGame.Jockey,
                        totalplayers:currGame.Players.length
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
            if(currGame.board.leftOutCards.length===0){
                // make the givenbacks the leftoutCards >>
                 const newRemainings=JustShuffle(currGame.board.givenBackCards);
                // currGame.board.leftOutCards=currGame.board.givenBackCards;
                currGame.board.leftOutCards=newRemainings
                currGame.board.givenBackCards=[]
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
        //if the currgame.board.leftoutCards are empty make the givenbacks assigned to leftouts and make givenbacks empty .. 
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
        const gameState = {
            type: "gameStateUpdate",
            remainingCards: game.board.leftOutCards,
            givenBackCards: game.board.givenBackCards,
            validSets:game.board.validSets,
            Winner:game.Winner
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


