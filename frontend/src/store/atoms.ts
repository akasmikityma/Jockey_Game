import { atom, atomFamily, selectorFamily } from "recoil";
import { Card } from "./Cards";

//just need to care for this very client's inhandCards ..
//validSets -Card[][]
export const gamePlayers=atom({
    key:"players_in_the_game",
    default:0
})
export const RealJockey=atom({
    key:"therealJockey",
    default:<Card|null>null
})
export const JockeyOftheGame=atom<Card>({
    key:"theJockeyOftheGame",
    default:{ key: 'd', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' }
})
export const Socket_ME=atom({
    key:"ultimate_Player",
    default:<WebSocket|null>null
})
export const setIntheModal=atom({
    key:"theCardsIntheModal",
    default:<Card[]>[]
})
export const plyers_InHands=atom({
    key:"inHandCardsOfPlayer1",
    default:<Card[]>[{ key: 's', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/pj.png' },
        { key: 's', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p10.png' },
        { key: 'h', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sq.png' },
        { key: 'h', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png' }, 
        { key: 'c', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/ka.png' },
        { key: 'h', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png' }, { key: 'c', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/ka.png' },
        { key: 'h', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png' },
       ]
}) 

// export const getATom=atomFamily({
//     key:"atomFamilytogetsingleAtom",
//     default:selectorFamily({
//         key:"selecInsidetheAtomFamily",
//         get: (image:string)=>({get})=>{
//             const cards=get(plyers_InHands);
//             return cards.find((c)=>c.image===image)
//         }
//     })
// })

export const pl1_Valids=atom({
    key:"player1Valids",
    default:<Card[][]>[
        // [
        //     { key: 'd', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' },
        // { key: 'd', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' },
        // { key: 'd', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' },
        // ]
    ]
}) 
export const pl2_Valids=atom({
    key:"Player2_valids",
    default:<Card[][]>[[
        { key: 'c', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k6.png' },
    { key: 'c', card: 5, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k5.png' },
    { key: 'c', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k4.png' },
    { key: 'c', card: 3, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k3.png' },
    { key: 'c', card: 2, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k2.png' }
    ]]
})
export const toPutWhere=atom({
    key:"startorEnd",
    default:'start'
})
export const OpenOptions=atom({
    key:"Optionstoputthecard",
    default:false
})
export const pl3_Valids=atom({
    key:"player3valids",
    default:<Card[][]>[]
})
export const pl4_Valids=atom({
    key:"player4_valids",
    default:<Card[][]>[[
        { key: 's', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p8.png' },
    { key: 's', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p7.png' },
    { key: 's', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png' },
    ]]
})
export const allvalids=atom({
    key:"allValidsintheGame",
    default:<Card[][]>[
    //     [
    //     { key: 's', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p8.png' },
    //     { key: 's', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p7.png' },
    //     { key: 's', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png' },
    // ]
]
})
export const selectedCards=atom({
    key:"selectedForValidSets",
    default:<Card[]>[]
})

export const remainingCards=atom({
    key:"game's_remainingcards",
    default:<Card[]>[]
})
export const given_backs=atom({
    key:"game's_GivenBackCards",
    default:<Card[]>[]
})

//startgame,takefromrem,takefromgb,showset,giveback,leaveCard,leaveCardFromgb