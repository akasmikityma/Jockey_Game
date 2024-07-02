import { Cards2 } from "./CardsAll";
import { card } from "./CardsAll";

export const flatten_Cards:card[]=Cards2.flat();

const shuffleTheCards=(flatten_Cards:card[])=>{
    const n=flatten_Cards.length;
    for(let i=n-1;i>0;i--){
        let index=CreateRandom(0,i);
        //swap these numbers

        let temp=flatten_Cards[i];
        flatten_Cards[i]=flatten_Cards[index];
        flatten_Cards[index]=temp
    }
    return flatten_Cards;
}

export const DistributingCards = (players: number, The_Array: card[]): { playerArrays: card[][], remainingElements: card[] } => {
    if (players < 1 || players > 5) {
        throw new Error("Number of players must be between 1 and 5");
    }

    // Check for unique cards in The_Array
    const uniqueCards = Array.from(new Set(The_Array.map(card => JSON.stringify(card)))).map(str => JSON.parse(str));
    if (uniqueCards.length !== The_Array.length) {
        throw new Error("The_Array contains duplicate cards.");
    }

    const shuffled = shuffleTheCards(The_Array);

    const playerArrays: card[][] = Array.from({ length: players }, () => []);

    let index = 0;
    while (true) {
        playerArrays[index % players].push(shuffled.shift()!);

        if (playerArrays.every(arr => arr.length >= 8)) {
            break;
        }

        index++;
    }

    const remainingElements = shuffled;
    return { playerArrays, remainingElements };
};

const CreateRandom=(start:number,end:number)=>{
    const ans= Math.floor(Math.random()*end)
    return ans
}
const sequence=['A',2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
export const getJockey=(restElements:card[])=>{
    const last_obj=restElements[restElements.length-1];
    console.log(last_obj)
    for(let i=0;i<sequence.length;i++){
        if(last_obj?.card===sequence[i]){
            return sequence[i+1];
        }
    }
    return last_obj;
}
export const setValidator = (arr: card[]): boolean => {
    // Edge case: if the array length is less than 3, it cannot be a valid set
    if (arr.length < 3) return false;

    // Helper function to check if the set is sequential
    const isSequentialSet = (arr: card[]): boolean => {
        const sequenceMap = new Map(sequence.map((card, index) => [card, index]));
        // Extract the card values and map them to their indices in the sequence
        const cardIndices = arr.map(card => sequenceMap.get(card.card)).filter(index => index !== undefined);

        // If any card is not found in the sequence, it's not a valid sequential set
        if (cardIndices.length !== arr.length) return false;

        // Sort the indices and check if they form a consecutive sequence
        cardIndices.sort((a, b) => a! - b!);

        for (let i = 1; i < cardIndices.length; i++) {
            if (cardIndices[i]! !== cardIndices[i - 1]! + 1) {
                return false;
            }
        }
        return true;
    };

    // Helper function to check if all cards are the same
    const isSameCardsSet = (arr: card[]): boolean => {
        const firstCard = arr[0].card;
        return arr.every(card => card.card === firstCard);
    };

    return isSequentialSet(arr) || isSameCardsSet(arr);
};

// const playerCardshere=DistributingCards(4,flatten_Cards).playerArrays;
// console.log(playerCardshere)