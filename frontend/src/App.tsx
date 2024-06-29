// import React from 'react'
// import { FC } from 'react';
// import { motion } from 'framer-motion';
// interface Card {
//   value: string;
//   // Add any other properties your card object might have
//   suit?: string;
//   id: number;
// }   
// interface CardProps {
//   card: Card;
// }
// const Card: FC<CardProps> = ({ card }) => {
//   return (
//     <motion.div
//       className="w-32 h-48 bg-white shadow-lg rounded-lg flex items-center justify-center"
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//     >
//       {card.value}
//     </motion.div>
//   );
// };
// const App: FC = () => {
//   const cards: Card[] = [
//     { value: 'A', suit: 'hearts', id: 1 },
//     { value: 'K', suit: 'spades', id: 2 },
//     { value: 'Q', suit: 'diamonds', id: 3 },
//     { value: 'J', suit: 'clubs', id: 4 },
//   ];

//   return (
//     <div className="flex space-x-4 p-8">
//       {cards.map((card) => (
//         <Card key={card.id} card={card} />
//       ))}
//     </div>
//   );
// };

// export default App
import React from 'react'
import CardCell from './comps/CardCell'

const App = () => {
  return (
    <div>
      <CardCell card={{key: 'd', card: 2, image: 'https://via.placeholder.com/150?text=2D'}}/>
    </div>
  )
}

export default App