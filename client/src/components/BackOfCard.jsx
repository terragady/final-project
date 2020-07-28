import React, { useState } from 'react';
import backOfCards from './backOfCards';

const BackOfCard = ({ id, handleCardClick }) => {
  const [backOfCard, setBackOfCard] = useState(backOfCards[id]);
  return (
    <div role="presentation" onClick={handleCardClick}>
      {backOfCard.cardName}
    </div>
  );
};

export default BackOfCard;
