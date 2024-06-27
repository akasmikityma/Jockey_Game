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
            // console.log(`remaining cards :${remainingElements.flat()}`)
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

// const getter=DistributingCards(5,flatten_Cards)
// console.log(getter.playerArrays);

// const remainigOnes=getter.remainingElements;
// console.log(getter.remainingElements)
// console.log(getJockey(remainigOnes))
