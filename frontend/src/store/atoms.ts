import { atom } from "recoil";
import { Card } from "./Cards";

//just need to care for this very client's inhandCards ..
//validSets -Card[][]

export const plyers_InHands=atom({
    key:"inHandCardsOfPlayer1",
    default:<Card[]>[{ key: 's', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/pj.png' },
        { key: 's', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p10.png' },{ key: 'h', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sq.png' },
        { key: 'h', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png' }, { key: 'c', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/ka.png' },
        { key: 'c', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/kq.png' },
        { key: 'c', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/kk.png' },
        { key: 'c', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/kj.png' },]
}) 


export const pl1_Valids=atom({
    key:"player1Valids",
    default:<Card[][]>[[
        { key: 'd', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' },
    { key: 'd', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' },
    { key: 'd', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' },
    ]]
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

export const pl3_Valids=atom({
    key:"player3valids",
    default:<Card[][]>[[
        { key: 'h', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s9.png' },
    { key: 'h', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s8.png' },
    { key: 'h', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s7.png' },
    { key: 'h', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s6.png' },
    ]]
})
export const pl4_Valids=atom({
    key:"player4_valids",
    default:<Card[][]>[[
        { key: 's', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p8.png' },
    { key: 's', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p7.png' },
    { key: 's', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png' },
    ]]
})

export const remainingCards=atom({
    key:"game's_remainingcards",
    default:<Card[]>[
        { key: 'h', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sa.png' },
        { key: 'h', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sq.png' },
        { key: 'h', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png' },
        { key: 'h', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sj.png' },
        { key: 'h', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s10.png' },
        { key: 'h', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s9.png' },
        { key: 'h', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s8.png' },
        { key: 'h', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s7.png' },
        { key: 'h', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s6.png' },
    ]
})
export const given_backs=atom({
    key:"game's_GivenBackCards",
    default:<Card[]>[
       { key: 'h', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sa.png' },
        { key: 'h', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sq.png' },
        { key: 'h', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png' },
        { key: 'h', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sj.png' },
        { key: 'h', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s10.png' },
        { key: 'h', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s9.png' },
        { key: 'h', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s8.png' },
        { key: 'h', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s7.png' },
        { key: 'h', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s6.png' },
    ]
})