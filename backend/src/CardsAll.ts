export interface card{
    key: string;
    card: string | number;
    image: string;
}
const spades: card[] = [
    { key: 's', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/pa.png' },
    { key: 's', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/pq.png' },
    { key: 's', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/pk.png' },
    { key: 's', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/pj.png' },
    { key: 's', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p10.png' },
    { key: 's', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p9.png' },
    { key: 's', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p8.png' },
    { key: 's', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p7.png' },
    { key: 's', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p6.png' },
    { key: 's', card: 5, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p5.png' },
    { key: 's', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p4.png' },
    { key: 's', card: 3, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p3.png' },
    { key: 's', card: 2, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/p2.png' }
  ];
  
  const hearts: card[] = [
    { key: 'h', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sa.png' },
    { key: 'h', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sq.png' },
    { key: 'h', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sk.png' },
    { key: 'h', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/sj.png' },
    { key: 'h', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s10.png' },
    { key: 'h', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s9.png' },
    { key: 'h', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s8.png' },
    { key: 'h', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s7.png' },
    { key: 'h', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s6.png' },
    { key: 'h', card: 5, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s5.png' },
    { key: 'h', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s4.png' },
    { key: 'h', card: 3, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s3.png' },
    { key: 'h', card: 2, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/s2.png' }
  ];
  
  const clubs: card[] = [
    { key: 'c', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/ka.png' },
    { key: 'c', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/kq.png' },
    { key: 'c', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/kk.png' },
    { key: 'c', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/kj.png' },
    { key: 'c', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k10.png' },
    { key: 'c', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k9.png' },
    { key: 'c', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k8.png' },
    { key: 'c', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k7.png' },
    { key: 'c', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k6.png' },
    { key: 'c', card: 5, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k5.png' },
    { key: 'c', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k4.png' },
    { key: 'c', card: 3, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k3.png' },
    { key: 'c', card: 2, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/k2.png' }
  ];
  
 export  const diamonds: card[] = [
    { key: 'd', card: 'A', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png' },
    { key: 'd', card: 'Q', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/lq.png' },
    { key: 'd', card: 'K', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/lk.png' },
    { key: 'd', card: 'J', image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/lj.png' },
    { key: 'd', card: 10, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l10.png' },
    { key: 'd', card: 9, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l9.png' },
    { key: 'd', card: 8, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l8.png' },
    { key: 'd', card: 7, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l7.png' },
    { key: 'd', card: 6, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l6.png' },
    { key: 'd', card: 5, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l5.png' },
    { key: 'd', card: 4, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l4.png' },
    { key: 'd', card: 3, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l3.png' },
    { key: 'd', card: 2, image: 'https://www.improvemagic.com/wp-content/uploads/2020/11/l2.png' }
  ];
export const Cards2=[hearts,diamonds,spades,clubs];