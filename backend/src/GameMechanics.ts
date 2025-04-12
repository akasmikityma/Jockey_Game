import { Cards2 } from "./CardsAll";
import { card } from "./CardsAll";

// export const flatten_Cards:card[]=Cards2.flat();
export const getNewDeck = (): card[] => {
    return Cards2.flat();
};

const shuffleTheCards = (cards: card[]): card[] => {
    // Ensure uniqueness before shuffling
    const uniqueCards = Array.from(
        new Map(cards.map(card => [`${card.key}-${card.card}`, card])).values()
    );

    for (let i = uniqueCards.length - 1; i > 0; i--) {
        const j = CreateRandom(i);
        [uniqueCards[i], uniqueCards[j]] = [uniqueCards[j], uniqueCards[i]];
    }

    return uniqueCards;
};


export const JustShuffle = (cards: card[]): card[] => {
    const deckCopy = [...cards]; // Create a shallow copy
    for (let i = deckCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
    }
    return deckCopy;
};

export const DistributingCards = (players: number, gameDeck: card[]): { playerArrays: card[][], remainingElements: card[] } => {
    if (players < 1 || players > 5) {
        throw new Error("Number of players must be between 1 and 5");
    }

    // Ensure the deck is unique
    const uniqueDeck = Array.from(
        new Map(gameDeck.map(card => [`${card.key}-${card.card}`, card])).values()
    );

    console.log("Unique deck size before shuffle:", uniqueDeck.length);

    // Shuffle the unique deck
    const shuffled = shuffleTheCards([...uniqueDeck]);
    console.log("Shuffled deck size:", shuffled.length);

    const playerArrays: card[][] = Array.from({ length: players }, () => []);
    const cardsPerPlayer = 8;

    // Distribute exactly 8 unique cards to each player
    for (let i = 0; i < players * cardsPerPlayer && shuffled.length > 0; i++) {
        const playerIndex = Math.floor(i / cardsPerPlayer);
        const card = shuffled.shift();
        if (card) {
            playerArrays[playerIndex].push(card);
        }
    }

    // Validate that each player has unique cards
    const allCards = playerArrays.flat();
    const uniqueCards = new Set(allCards.map(card => `${card.key}-${card.card}`));
    if (allCards.length !== uniqueCards.size) {
        throw new Error("Duplicate cards detected in player hands!");
    }

    // Log distribution for debugging
    playerArrays.forEach((hand, idx) => {
        console.log(`Player ${idx} cards:`, hand.map(c => `${c.key}-${c.card}`).join(', '));
    });

    return { 
        playerArrays, 
        remainingElements: shuffled.filter(card => card !== null)
    };
};

const CreateRandom=(end:number)=>{
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
// export const setValidator = (arr: card[],Jockey:string|number): boolean => {
    
//     if (arr.length < 3) return false;

   
//     const isSequentialSet = (arr: card[]): boolean => {
//         const sequenceMap = new Map(sequence.map((card, index) => [card, index]));  
//         const cardIndices = arr.map(card => sequenceMap.get(card.card)).filter(index => index !== undefined);     
//         if (cardIndices.length !== arr.length) return false;   
//         cardIndices.sort((a, b) => a! - b!);
//         for (let i = 1; i < cardIndices.length; i++) {
//             if (cardIndices[i]! !== cardIndices[i - 1]! + 1) {
//                 return false;
//             }
//         }
//         return true;
//     };

    
//     const isSameCardsSet = (arr: card[]): boolean => {
//         const firstCard = arr[0].card;
//         return arr.every(card => card.card === firstCard);
//     };

//     return isSequentialSet(arr) || isSameCardsSet(arr);
// };

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
//----method to validate a set --------
// export const setValidator = (arr: card[],Jockey:string|number): boolean => {
    
//     if (arr.length < 3) return false;

   
//     const isSequentialSet = (arr: card[]): boolean => {
//         const sequenceMap = new Map(sequence.map((card, index) => [card, index]));  
//         const cardIndices = arr.map(card => sequenceMap.get(card.card)).filter(index => index !== undefined);     
//         if (cardIndices.length !== arr.length) return false;   
//         cardIndices.sort((a, b) => a! - b!);
//         for (let i = 1; i < cardIndices.length; i++) {
//             if (cardIndices[i]! !== cardIndices[i - 1]! + 1) {
//                 return false;
//             }
//         }
//         return true;
//     };

    
//     const isSameCardsSet = (arr: card[]): boolean => {
//         const firstCard = arr[0].card;
//         return arr.every(card => card.card === firstCard);
//     };

//     return isSequentialSet(arr) || isSameCardsSet(arr);
// };

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