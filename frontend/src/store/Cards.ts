export type Card = {
    key: string;
    card: string | number;
    image: string;
  };
  
  const spades: Card[] = [
    { key: 's', card: 'A', image: 'https://via.placeholder.com/150?text=AS' },
    { key: 's', card: 'Q', image: 'https://via.placeholder.com/150?text=QS' },
    { key: 's', card: 'K', image: 'https://via.placeholder.com/150?text=KS' },
    { key: 's', card: 'J', image: 'https://via.placeholder.com/150?text=JS' },
    { key: 's', card: 10, image: 'https://via.placeholder.com/150?text=10S' },
    { key: 's', card: 9, image: 'https://via.placeholder.com/150?text=9S' },
    { key: 's', card: 8, image: 'https://via.placeholder.com/150?text=8S' },
    { key: 's', card: 7, image: 'https://via.placeholder.com/150?text=7S' },
    { key: 's', card: 6, image: 'https://via.placeholder.com/150?text=6S' },
    { key: 's', card: 5, image: 'https://via.placeholder.com/150?text=5S' },
    { key: 's', card: 4, image: 'https://via.placeholder.com/150?text=4S' },
    { key: 's', card: 3, image: 'https://via.placeholder.com/150?text=3S' },
    { key: 's', card: 2, image: 'https://via.placeholder.com/150?text=2S' }
  ];
  
  const hearts: Card[] = [
    { key: 'h', card: 'A', image: 'https://via.placeholder.com/150?text=AH' },
    { key: 'h', card: 'Q', image: 'https://via.placeholder.com/150?text=QH' },
    { key: 'h', card: 'K', image: 'https://via.placeholder.com/150?text=KH' },
    { key: 'h', card: 'J', image: 'https://via.placeholder.com/150?text=JH' },
    { key: 'h', card: 10, image: 'https://via.placeholder.com/150?text=10H' },
    { key: 'h', card: 9, image: 'https://via.placeholder.com/150?text=9H' },
    { key: 'h', card: 8, image: 'https://via.placeholder.com/150?text=8H' },
    { key: 'h', card: 7, image: 'https://via.placeholder.com/150?text=7H' },
    { key: 'h', card: 6, image: 'https://via.placeholder.com/150?text=6H' },
    { key: 'h', card: 5, image: 'https://via.placeholder.com/150?text=5H' },
    { key: 'h', card: 4, image: 'https://via.placeholder.com/150?text=4H' },
    { key: 'h', card: 3, image: 'https://via.placeholder.com/150?text=3H' },
    { key: 'h', card: 2, image: 'https://via.placeholder.com/150?text=2H' }
  ];
  
  const clubs: Card[] = [
    { key: 'c', card: 'A', image: 'https://via.placeholder.com/150?text=AC' },
    { key: 'c', card: 'Q', image: 'https://via.placeholder.com/150?text=QC' },
    { key: 'c', card: 'K', image: 'https://via.placeholder.com/150?text=KC' },
    { key: 'c', card: 'J', image: 'https://via.placeholder.com/150?text=JC' },
    { key: 'c', card: 10, image: 'https://via.placeholder.com/150?text=10C' },
    { key: 'c', card: 9, image: 'https://via.placeholder.com/150?text=9C' },
    { key: 'c', card: 8, image: 'https://via.placeholder.com/150?text=8C' },
    { key: 'c', card: 7, image: 'https://via.placeholder.com/150?text=7C' },
    { key: 'c', card: 6, image: 'https://via.placeholder.com/150?text=6C' },
    { key: 'c', card: 5, image: 'https://via.placeholder.com/150?text=5C' },
    { key: 'c', card: 4, image: 'https://via.placeholder.com/150?text=4C' },
    { key: 'c', card: 3, image: 'https://via.placeholder.com/150?text=3C' },
    { key: 'c', card: 2, image: 'https://via.placeholder.com/150?text=2C' }
  ];
  
  const diamonds: Card[] = [
    { key: 'd', card: 'A', image: 'https://via.placeholder.com/150?text=AD' },
    { key: 'd', card: 'Q', image: 'https://via.placeholder.com/150?text=QD' },
    { key: 'd', card: 'K', image: 'https://via.placeholder.com/150?text=KD' },
    { key: 'd', card: 'J', image: 'https://via.placeholder.com/150?text=JD' },
    { key: 'd', card: 10, image: 'https://via.placeholder.com/150?text=10D' },
    { key: 'd', card: 9, image: 'https://via.placeholder.com/150?text=9D' },
    { key: 'd', card: 8, image: 'https://via.placeholder.com/150?text=8D' },
    { key: 'd', card: 7, image: 'https://via.placeholder.com/150?text=7D' },
    { key: 'd', card: 6, image: 'https://via.placeholder.com/150?text=6D' },
    { key: 'd', card: 5, image: 'https://via.placeholder.com/150?text=5D' },
    { key: 'd', card: 4, image: 'https://via.placeholder.com/150?text=4D' },
    { key: 'd', card: 3, image: 'https://via.placeholder.com/150?text=3D' },
    { key: 'd', card: 2, image: 'https://via.placeholder.com/150?text=2D' }
  ];
  export const allCards=[spades,hearts,clubs,diamonds];