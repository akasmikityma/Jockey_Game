import React, { useState, useEffect } from 'react';
import { allCards, Card } from "../store/Cards";

interface CardCellProps {
  card: Card;
}

const CardCell: React.FC<CardCellProps> = ({ card }) => {
  const [thisCard, setThisCard] = useState<Card>({
    key: '',
    card: '',
    image: ''
  });

  useEffect(() => {
    const findCard = () => {
      const flatCards = allCards.flat();
      const theCard = flatCards.find((c) => c.key === card.key && c.card === card.card);
      setThisCard(theCard || { key: '', card: '', image: '' });
    };

    findCard();
  }, [card]);

  return (
    <div>
      <img src={thisCard.image} alt={`${thisCard.card} of ${thisCard.key}`} />
    </div>
  );
};

export default CardCell;
