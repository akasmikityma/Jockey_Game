
// import { WebSocket } from "ws";
// import { card } from "../CardsAll";

// export interface plr extends WebSocket {
//     cards: card[];
//     hasStarted: boolean; // Track if the player has sent the "start" message
// }
// class Board{
//     public leftOutCards:card[];
//     public givenBackCards:card[];
//     public validSets:card[][];
    
//     constructor(){
//         this.givenBackCards=[];
//         this.leftOutCards=[];
//         this.validSets=[]
//     }
// }
// export class Game {
//     public Players: plr[];
//     public remainingCards:card[]
//     public Jockey:string|number|card
//     public board:Board
//     public moveCount:number
//     constructor(players: plr[]) {
//         this.Players = players;
//         this.remainingCards=[]
//         this.Jockey='';
//         this.board=new Board()
//         this.moveCount=0;
//         for (let i = 0; i < this.Players.length; i++) {
//             this.Players[i].send(JSON.stringify({
//                 msg: `I'm player ${i} and the cards: ${JSON.stringify(this.Players[i].cards)}`
//             }));
//         }
//         console.log(this.remainingCards)
//     }
    
//     allPlayersStarted() {
//         return this.Players.every(player => player.hasStarted);
//     }

//     isEnded() {
//         return this.Players.some(player => player.cards.length === 0);
//     }
// }

//------------------------------------------------------------------------------------

// import { WebSocket } from "ws";
// import { card } from "../CardsAll";

// export interface plr extends WebSocket {
//     cards: card[];
//     hasStarted: boolean;
//     valids:card[]
// }
// export interface plr extends WebSocket {
//     name:string;
//     cards: card[];
//     hasStarted: boolean;
//     valids:card[]
// }
// class Board {
//     public leftOutCards: card[];
//     public givenBackCards: card[];
//     public validSets: card[][];

//     constructor() {
//         this.leftOutCards = [];
//         this.givenBackCards = [];
//         this.validSets = [];
//     }
// }

// export class Game {
//     public Winner:string;
//     public Players: plr[];
//     public remainingCards: card[];
//     public Jockey: string | number;
//     public board: Board;
//     public moveCount: number;
//     private awaitingGiveBack: boolean;
//     private currentPlayerIndex:number
//     constructor(players: plr[]) {
//         this.Winner=''
//         this.Players = players;
//         this.remainingCards = [];
//         this.Jockey = '';
//         this.board = new Board();
//         this.moveCount = 0;
//         this.awaitingGiveBack = false;
//         this.currentPlayerIndex=0
//         for (let i = 0; i < this.Players.length; i++) {
//             this.Players[i].send(JSON.stringify({
//                 msg: `I'm player ${i} and the cards: ${JSON.stringify(this.Players[i].cards)}`
//             }));
//         }
//     }

//     // getCurrentPlayer(): plr {
//     //     return this.Players[this.currentPlayerIndex];
//     // }

//     nextPlayer() {
//         this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.Players.length;
//     }

//     notifyCurrentPlayer() {
//         const currentPlayer = this.getCurrentPlayer();
//         if (currentPlayer) {
//             currentPlayer.send(JSON.stringify({ type: "yourTurn", msg: "It's your turn!" }));
//         }
//     }

//     allPlayersStarted() {
//         return this.Players.every(player => player.hasStarted);
//     }

//     isEnded() {
//         return this.Players.some(player => player.cards.length === 0);
//     }

//     getCurrentPlayer(): plr {
//         return this.Players[this.moveCount % this.Players.length];
//     }

//     incrementMoveCount() {
//         this.moveCount++;
//         this.awaitingGiveBack = false;
//     }

//     setAwaitingGiveBack(value: boolean) {
//         this.awaitingGiveBack = value;
//     }

//     isAwaitingGiveBack(): boolean {
//         return this.awaitingGiveBack;
//     }
// }

/// <reference types="node" />
/// <reference types="ws" />

import { WebSocket } from "ws";
import { card, Cards2 } from "../CardsAll";

export interface plr extends WebSocket {
    name: string;
    cards: card[];
    hasStarted: boolean;
    valids: card[];
    playerId : string ; 
    send(data: string): void; // Ensure send is recognized
}

class Board {
    public leftOutCards: card[];
    public givenBackCards: card[];
    public validSets: card[][];

    constructor() {
        this.leftOutCards = [];
        this.givenBackCards = [];
        this.validSets = [];
    }
}

export class Game {
    public Players: plr[];
    public remainingCards: card[];
    public Winner: string;
    public Jockey: any;
    public board: Board;
    public moveCount: number;
    public awaitingGiveBack: boolean;
    public currentPlayerIndex: number;
    private gameDeck: card[];

    constructor(players: plr[]) {
        this.Players = players;
        this.Winner = '';
        this.remainingCards = [];
        this.Jockey = '';
        this.board = new Board();
        this.moveCount = 0;
        this.awaitingGiveBack = false;
        this.currentPlayerIndex = 0;
        this.gameDeck = Cards2.flat();

        this.Players.forEach((player, index) => {
            player.send(JSON.stringify({
                msg: `I'm player ${index} and the cards: ${JSON.stringify(player.cards)}`
            }));
        });
    }

    public getGameDeck(): card[] {
        return [...this.gameDeck]; // Return a copy of the deck
    }
    
    getCurrentPlayer(): plr {
        return this.Players[this.currentPlayerIndex];
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.Players.length;
    }

    notifyCurrentPlayer() {
        const currentPlayer = this.getCurrentPlayer();
        if (currentPlayer) {
            currentPlayer.send(JSON.stringify({ type: "yourTurn", msg: "It's your turn!" }));
        }
    }
    
    allPlayersStarted() {
        return this.Players.every(player => player.hasStarted);
    }

    isEnded() {
        return this.Players.some(player => player.cards.length === 0);
    }

    incrementMoveCount() {
        this.moveCount++;
        this.awaitingGiveBack = false;
    }

    setAwaitingGiveBack(value: boolean) {
        this.awaitingGiveBack = value;
    }

    isAwaitingGiveBack(): boolean {
        return this.awaitingGiveBack;
    }
}

//------------------------------------------------------------------------------------ end

// export interface plr extends WebSocket {
//     name: string;
//     cards: card[];
//     hasStarted: boolean;
//     valids: card[];
// }

// class Board {
//     public leftOutCards: card[];
//     public givenBackCards: card[];
//     public validSets: card[][];

//     constructor() {
//         this.leftOutCards = [];
//         this.givenBackCards = [];
//         this.validSets = [];
//     }
// }

// export class Game {
//     public Winner: string;
//     public Players: plr[];
//     public remainingCards: card[];
//     public Jockey: string | number;
//     public board: Board;
//     public moveCount: number;
//     private awaitingGiveBack: boolean;
//     private currentPlayerIndex: number;

//     constructor(players: plr[]) {
//         this.Winner = '';
//         this.Players = players;
//         this.remainingCards = [];
//         this.Jockey = '';
//         this.board = new Board();
//         this.moveCount = 0;
//         this.awaitingGiveBack = false;
//         this.currentPlayerIndex = 0; // Start with the first player

//         for (let i = 0; i < this.Players.length; i++) {
//             this.Players[i].send(JSON.stringify({
//                 msg: `I'm player ${i} and the cards: ${JSON.stringify(this.Players[i].cards)}`
//             }));
//         }

//         this.notifyCurrentPlayer(); // Notify the first player at game start
//     }

//     allPlayersStarted() {
//         return this.Players.every(player => player.hasStarted);
//     }

//     isEnded() {
//         return this.Players.some(player => player.cards.length === 0);
//     }

//     getCurrentPlayer(): plr {
//         return this.Players[this.currentPlayerIndex];
//     }

//     nextPlayer() {
//         this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.Players.length;
//     }

//     notifyCurrentPlayer() {
//         const currentPlayer = this.getCurrentPlayer();
//         if (currentPlayer) {
//             currentPlayer.send(JSON.stringify({ type: "yourTurn", msg: "It's your turn!" }));
//         }
//     }

//     incrementMoveCount() {
//         this.moveCount++;
//         this.awaitingGiveBack = false;
//     }

//     setAwaitingGiveBack(value: boolean) {
//         this.awaitingGiveBack = value;
//     }

//     isAwaitingGiveBack(): boolean {
//         return this.awaitingGiveBack;
//     }
// }
