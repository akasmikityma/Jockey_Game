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

export const JustShuffle=(cards:card[])=>{
    const shuffledDeck = [...cards];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; // Swap elements
    }
  
    return shuffledDeck;
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
export const sequence=['A',2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
export const getJockey = (restElements: card[]): { lastCard: card, Jockey: any } => {
    const lastCard = restElements[restElements.length - 1];
    console.log(lastCard);
    let Jockey;

    for (let i = 0; i < sequence.length; i++) {
        if (lastCard?.card === sequence[i]) {
            Jockey = sequence[(i + 1) % sequence.length];
            break;
        }
    }

    return { lastCard, Jockey };
};

//----method to validate a set --------
export const setValidator = (arr: card[],Jockey:string|number): boolean => {
    
    if (arr.length < 3) return false;

   
    const isSequentialSet = (arr: card[]): boolean => {
        const sequenceMap = new Map(sequence.map((card, index) => [card, index]));  
        const cardIndices = arr.map(card => sequenceMap.get(card.card)).filter(index => index !== undefined);     
        if (cardIndices.length !== arr.length) return false;   
        cardIndices.sort((a, b) => a! - b!);
        for (let i = 1; i < cardIndices.length; i++) {
            if (cardIndices[i]! !== cardIndices[i - 1]! + 1) {
                return false;
            }
        }
        return true;
    };

    
    const isSameCardsSet = (arr: card[]): boolean => {
        const firstCard = arr[0].card;
        return arr.every(card => card.card === firstCard);
    };

    return isSequentialSet(arr) || isSameCardsSet(arr);
};

// const result=setValidator([
//     { key: 's', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png' },
//     { key: 's', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p7.png' },
//     { key: 'd', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l4.png' },
//     { key: 's', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p9.png' },
//     { key: 's', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p10.png' },
    
// ],4)
// console.log(result)
// const playerCardshere=DistributingCards(4,flatten_Cards).playerArrays;
// console.log(playerCardshere)

// const shuffled=JustShuffle(flatten_Cards);
// console.log(shuffled);