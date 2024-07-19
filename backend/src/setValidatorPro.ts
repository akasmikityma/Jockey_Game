import { card } from "./CardsAll";
import { sequence } from "./GameMechanics";

// function isWildcardSubarray(subArray:card[], wildcard:string|number):boolean {
//     // Get lengths of the main array and the subarray
//     const mainLength = sequence.length;
//     const updated_subarray=subArray.map(c=>c.card);
//     const subLength = updated_subarray.length;
//     console.log(updated_subarray)
//     if (subLength === 0) {
//         return true;
//     }
  
    
//     if (subLength > mainLength) {
//         return false;
//     }
  
//     const isSameValueSet = (arr:(string|number)[]) => {
//         const firstValue = arr.find(val => val !== wildcard);
//         return arr.every(val => val === firstValue || val === wildcard);
//     };
//     for (let i = 0; i <= mainLength - subLength; i++) {
        
//         const slice = sequence.slice(i, i + subLength);
       
//         const isSequentialMatch  = slice.every((value, index) => 
//             value === updated_subarray[index] || updated_subarray[index] === wildcard
//         );
//         const isSameValueMatch = isSameValueSet(slice);
//         console.log(isSameValueMatch)
//         if (isSequentialMatch || isSameValueMatch) {
//             return true;
//         }
//     }
  
    
//     return false;
// }
export function isWildcardSubarray(subArray: card[], wildcard: string | number): boolean {
    if (!subArray) {
        console.error('subArray is undefined');
        return false;
    }

    if (!Array.isArray(subArray)) {
        console.error('subArray is not an array:', subArray);
        return false;
    }

    if (subArray.length === 0) {
        console.warn('subArray is empty');
        return true;
    }

    const mainLength = sequence.length;
    const updated_subarray = subArray.map(c => c.card);
    const subLength = updated_subarray.length;

    if (subLength > mainLength) {
        return false;
    }

    const isSameValueSet = (arr: (string | number)[]): boolean => {
        const firstValue = arr.find(val => val !== wildcard);
        return arr.every(val => val === firstValue || val === wildcard);
    };

    for (let i = 0; i <= mainLength - subLength; i++) {
        const slice = sequence.slice(i, i + subLength);

        const isSequentialMatch = slice.every((value, index) => 
            value === updated_subarray[index] || updated_subarray[index] === wildcard
        );

        const isSameValueMatch = isSameValueSet(updated_subarray);

        if (isSequentialMatch || isSameValueMatch) {
            return true;
        }
    }

    return false;
}


// Example usage
// const  firstArr=[
//     { key: 's', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png' },
//     { key: 's', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p7.png' },
//     { key: 'd', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l4.png' },
//     { key: 's', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p9.png' },
//     { key: 's', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p10.png' },
    
// ]
// const sameSettest=[ { key: 'd', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l6.png' },
//     { key: 's', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png' },
//     { key: 'd', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l4.png' },
//     { key: 'c', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k6.png' },
// ]
// const result=isWildcardSubarray(sameSettest,4)
// console.log(result)