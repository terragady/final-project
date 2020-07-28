const backOfCards = [
  {
    cardName: 'Start',
    type: 'Event',
    details: 'When a player passes start they receive 200M',
    clicked: false,
  },
  {
    cardName: 'Parker St.',
    type: 'Property',
    price: 60,
    rent: 8,
    details: 'This property can be purchased. If already owned, the player who lands on the property must pay rent to the owner.',
    clicked: false,
  },
  {
    cardName: 'Chest',
    clicked: false,
  },
  {
    cardName: 'Tyne St.',
    type: 'Property',
    price: 60,
    rent: 8,
    details: 'This property can be purchased. If already owned, the player who lands on the property must pay rent to the owner.',
    clicked: false,
  },
  {
    cardName: 'Income Tax',
    price: 200,
    details: 'When a player on this tile, tax must be paid to the bank',
    clicked: false,
  },
  {
    cardName: 'Reading Railroad',
    price: 200,
    clicked: false,
  },
  {
    cardName: 'Brighton Vale',
    price: 100,
    clicked: false,
  },
  {
    cardName: 'Chance',
    clicked: false,
  },
  {
    cardName: 'Granary Vale',
    price: 100,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Burford Vale',
    price: 120,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Jail',
    clicked: false,
  },
  {
    cardName: 'Holden Fold',
    clicked: false,
    price: 140,
  },
  {
    cardName: 'Electric Company',
    details: 'If one "Utility" is owned rent is 4 times amount shown on dice. \n If both "Utilities" are owned rent is 10 times amount shown on dice',
    clicked: false,
    mortgage: 75,
  },
  {
    cardName: 'Mere Fold',
    color: 'pink',
    price: 140,
    clicked: false,
    ownedBy: false,
    houses: 0,
  },
  {
    cardName: 'Hedger Fold',
    color: 'pink',
    price: 160,
    clicked: false,
    ownedBy: false,
    houses: 0,
  },
  {
    cardName: 'Pennsylvania Railroad',
    color: 'railroad',
    clicked: false,
    price: 200,
  },
  {
    cardName: 'Danthorpe Lodge',
    color: 'orange',
    price: 180,
    clicked: false,
    ownedBy: false,
    houses: 0,
  },
  {
    cardName: 'Chance',
    clicked: false,
  },
  {
    cardName: 'Rockingham Lodge',
    color: 'orange',
    price: 180,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Aveling Lodge',
    color: 'orange',
    price: 200,
    clicked: false,
    ownedBy: false,
    houses: 0,
  },
  {
    cardName: '',
    clicked: false,
  },
  {
    cardName: 'Brambleberry Lane',
    color: 'red',
    price: 220,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Chance',
  },
  {
    cardName: 'Guildford Lane',
    color: 'red',
    price: 220,
    clicked: false,
    ownedBy: false,
    houses: 0,
  },
  {
    cardName: 'Albany Lane',
    color: 'red',
    price: 240,
    clicked: false,
    ownedBy: false,
    houses: 0,
  },
  {
    cardName: 'Short Line',
    color: 'railroad',
    clicked: false,
    price: 200,
  },
  {
    cardName: 'Elms Villas',
    color: 'yellow',
    price: 260,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Keepers Villas',
    color: 'yellow',
    price: 260,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Water Works',
    details: 'If one "Utility" is owned rent is 4 times amount shown on dice. \n If both "Utilities" are owned rent is 10 times amount shown on dice',
    mortgage: 75,
  },
  {
    cardName: 'Moorcraft Villas',
    color: 'yellow',
    price: 280,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Go to jail',
    clicked: false,
  },
  {
    cardName: 'Whilworth Gardens',
    color: 'green',
    price: 300,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Brock Gardens',
    color: 'green',
    price: 300,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Chest',
    clicked: false,
  },
  {
    cardName: 'Fair Gardens',
    color: 'green',
    price: 320,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'B. & O. Railroad',
    color: 'railroad',
    price: 200,
    clicked: false,
  },
  {
    cardName: 'Chance',
    clicked: false,
  },
  {
    cardName: 'Hartington Avenue',
    color: 'blue',
    price: 350,
    ownedBy: false,
    clicked: false,
    houses: 0,
  },
  {
    cardName: 'Luxury Tax',
    rent: 150,
    clicked: false,
  },
  {
    cardName: 'Meadowlands Avenue',
    clicked: false,
  },
];

export default backOfCards;
