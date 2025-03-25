export interface card{
    key: string;
    card: string | number;
    image: string;
}
const spades: card[] = [
    { key: 's', card: 'A', image: '/cards/spades/a.png' },
    { key: 's', card: 'Q', image: '/cards/spades/q.png' },
    { key: 's', card: 'K', image: '/cards/spades/k.png' },
    { key: 's', card: 'J', image: '/cards/spades/j.png' },
    { key: 's', card: 10, image: '/cards/spades/10.png' },
    { key: 's', card: 9, image: '/cards/spades/9.png' },
    { key: 's', card: 8, image: '/cards/spades/8.png' },
    { key: 's', card: 7, image: '/cards/spades/7.png' },
    { key: 's', card: 6, image: '/cards/spades/6.png' },
    { key: 's', card: 5, image: '/cards/spades/5.png' },
    { key: 's', card: 4, image: '/cards/spades/4.png' },
    { key: 's', card: 3, image: '/cards/spades/3.png' },
    { key: 's', card: 2, image: '/cards/spades/2.png' }
  ];
  
  const hearts: card[] = [
    { key: 'h', card: 'A', image: '/cards/hearts/a.png' },
    { key: 'h', card: 'Q', image: '/cards/hearts/q.png' },
    { key: 'h', card: 'K', image: '/cards/hearts/k.png' },
    { key: 'h', card: 'J', image: '/cards/hearts/j.png' },
    { key: 'h', card: 10, image: '/cards/hearts/10.png' },
    { key: 'h', card: 9, image: '/cards/hearts/9.png' },
    { key: 'h', card: 8, image: '/cards/hearts/8.png' },
    { key: 'h', card: 7, image: '/cards/hearts/7.png' },
    { key: 'h', card: 6, image: '/cards/hearts/6.png' },
    { key: 'h', card: 5, image: '/cards/hearts/5.png' },
    { key: 'h', card: 4, image: '/cards/hearts/4.png' },
    { key: 'h', card: 3, image: '/cards/hearts/3.png' },
    { key: 'h', card: 2, image: '/cards/hearts/2.png' }
  ];
  
  const clubs: card[] = [
    { key: 'c', card: 'A', image: '/cards/clubs/a.png' },
    { key: 'c', card: 'Q', image: '/cards/hearts/q.png' },
    { key: 'c', card: 'K', image: '/cards/hearts/k.png' },
    { key: 'c', card: 'J', image: '/cards/hearts/j.png' },
    { key: 'c', card: 10, image: '/cards/hearts/10.png' },
    { key: 'c', card: 9, image: '/cards/hearts/9.png' },
    { key: 'c', card: 8, image: '/cards/hearts/8.png' },
    { key: 'c', card: 7, image: '/cards/hearts/7.png' },
    { key: 'c', card: 6, image: '/cards/hearts/6.png' },
    { key: 'c', card: 5, image: '/cards/hearts/5.png' },
    { key: 'c', card: 4, image: '/cards/hearts/4.png' },
    { key: 'c', card: 3, image: '/cards/hearts/3.png' },
    { key: 'c', card: 2, image: '/cards/hearts/2.png' }
  ];
  
 export  const diamonds: card[] = [
    { key: 'd', card: 'A', image: '/cards/diamonds/a.png' },
    { key: 'd', card: 'Q', image: '/cards/diamonds/q.png' },
    { key: 'd', card: 'K', image: '/cards/diamonds/k.png' },
    { key: 'd', card: 'J', image: '/cards/diamonds/j.png' },
    { key: 'd', card: 10, image: '/cards/diamonds/10.png' },
    { key: 'd', card: 9, image: '/cards/diamonds/9.png' },
    { key: 'd', card: 8, image: '/cards/diamonds/8.png' },
    { key: 'd', card: 7, image: '/cards/diamonds/7.png' },
    { key: 'd', card: 6, image: '/cards/diamonds/6.png' },
    { key: 'd', card: 5, image: '/cards/diamonds/5.png' },
    { key: 'd', card: 4, image: '/cards/diamonds/4.png' },
    { key: 'd', card: 3, image: '/cards/diamonds/3.png' },
    { key: 'd', card: 2, image: '/cards/diamonds/2.png' }
  ];
export const Cards2=[hearts,diamonds,spades,clubs];