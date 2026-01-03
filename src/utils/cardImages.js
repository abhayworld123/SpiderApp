// Card image mapping utility for React Native
const cardBackMap = {
  'cardBack_blue1.png': require('../../assets/images/cards/cardBack_blue1.png'),
  'cardBack_blue2.png': require('../../assets/images/cards/cardBack_blue2.png'),
  'cardBack_blue3.png': require('../../assets/images/cards/cardBack_blue3.png'),
  'cardBack_blue4.png': require('../../assets/images/cards/cardBack_blue4.png'),
  'cardBack_blue5.png': require('../../assets/images/cards/cardBack_blue5.png'),
  'cardBack_green1.png': require('../../assets/images/cards/cardBack_green1.png'),
  'cardBack_green2.png': require('../../assets/images/cards/cardBack_green2.png'),
  'cardBack_green3.png': require('../../assets/images/cards/cardBack_green3.png'),
  'cardBack_green4.png': require('../../assets/images/cards/cardBack_green4.png'),
  'cardBack_green5.png': require('../../assets/images/cards/cardBack_green5.png'),
  'cardBack_red1.png': require('../../assets/images/cards/cardBack_red1.png'),
  'cardBack_red2.png': require('../../assets/images/cards/cardBack_red2.png'),
  'cardBack_red3.png': require('../../assets/images/cards/cardBack_red3.png'),
  'cardBack_red4.png': require('../../assets/images/cards/cardBack_red4.png'),
  'cardBack_red5.png': require('../../assets/images/cards/cardBack_red5.png'),
};

export function getCardImageSource(card, cardBack = 'cardBack_blue5.png') {
  if (!card.faceUp) {
    return cardBackMap[cardBack] || cardBackMap['cardBack_blue5.png'];
  }
  
  const suitMap = {
    'S': 'Spades',
    'H': 'Hearts',
    'D': 'Diamonds',
    'C': 'Clubs'
  };
  
  const suit = suitMap[card.suit] || 'Spades';
  const rank = card.rank;
  
  // Map card names to require statements
  const cardImageMap = {
    'cardSpadesA': require('../../assets/images/cards/cardSpadesA.png'),
    'cardSpades2': require('../../assets/images/cards/cardSpades2.png'),
    'cardSpades3': require('../../assets/images/cards/cardSpades3.png'),
    'cardSpades4': require('../../assets/images/cards/cardSpades4.png'),
    'cardSpades5': require('../../assets/images/cards/cardSpades5.png'),
    'cardSpades6': require('../../assets/images/cards/cardSpades6.png'),
    'cardSpades7': require('../../assets/images/cards/cardSpades7.png'),
    'cardSpades8': require('../../assets/images/cards/cardSpades8.png'),
    'cardSpades9': require('../../assets/images/cards/cardSpades9.png'),
    'cardSpades10': require('../../assets/images/cards/cardSpades10.png'),
    'cardSpadesJ': require('../../assets/images/cards/cardSpadesJ.png'),
    'cardSpadesQ': require('../../assets/images/cards/cardSpadesQ.png'),
    'cardSpadesK': require('../../assets/images/cards/cardSpadesK.png'),
    'cardHeartsA': require('../../assets/images/cards/cardHeartsA.png'),
    'cardHearts2': require('../../assets/images/cards/cardHearts2.png'),
    'cardHearts3': require('../../assets/images/cards/cardHearts3.png'),
    'cardHearts4': require('../../assets/images/cards/cardHearts4.png'),
    'cardHearts5': require('../../assets/images/cards/cardHearts5.png'),
    'cardHearts6': require('../../assets/images/cards/cardHearts6.png'),
    'cardHearts7': require('../../assets/images/cards/cardHearts7.png'),
    'cardHearts8': require('../../assets/images/cards/cardHearts8.png'),
    'cardHearts9': require('../../assets/images/cards/cardHearts9.png'),
    'cardHearts10': require('../../assets/images/cards/cardHearts10.png'),
    'cardHeartsJ': require('../../assets/images/cards/cardHeartsJ.png'),
    'cardHeartsQ': require('../../assets/images/cards/cardHeartsQ.png'),
    'cardHeartsK': require('../../assets/images/cards/cardHeartsK.png'),
    'cardDiamondsA': require('../../assets/images/cards/cardDiamondsA.png'),
    'cardDiamonds2': require('../../assets/images/cards/cardDiamonds2.png'),
    'cardDiamonds3': require('../../assets/images/cards/cardDiamonds3.png'),
    'cardDiamonds4': require('../../assets/images/cards/cardDiamonds4.png'),
    'cardDiamonds5': require('../../assets/images/cards/cardDiamonds5.png'),
    'cardDiamonds6': require('../../assets/images/cards/cardDiamonds6.png'),
    'cardDiamonds7': require('../../assets/images/cards/cardDiamonds7.png'),
    'cardDiamonds8': require('../../assets/images/cards/cardDiamonds8.png'),
    'cardDiamonds9': require('../../assets/images/cards/cardDiamonds9.png'),
    'cardDiamonds10': require('../../assets/images/cards/cardDiamonds10.png'),
    'cardDiamondsJ': require('../../assets/images/cards/cardDiamondsJ.png'),
    'cardDiamondsQ': require('../../assets/images/cards/cardDiamondsQ.png'),
    'cardDiamondsK': require('../../assets/images/cards/cardDiamondsK.png'),
    'cardClubsA': require('../../assets/images/cards/cardClubsA.png'),
    'cardClubs2': require('../../assets/images/cards/cardClubs2.png'),
    'cardClubs3': require('../../assets/images/cards/cardClubs3.png'),
    'cardClubs4': require('../../assets/images/cards/cardClubs4.png'),
    'cardClubs5': require('../../assets/images/cards/cardClubs5.png'),
    'cardClubs6': require('../../assets/images/cards/cardClubs6.png'),
    'cardClubs7': require('../../assets/images/cards/cardClubs7.png'),
    'cardClubs8': require('../../assets/images/cards/cardClubs8.png'),
    'cardClubs9': require('../../assets/images/cards/cardClubs9.png'),
    'cardClubs10': require('../../assets/images/cards/cardClubs10.png'),
    'cardClubsJ': require('../../assets/images/cards/cardClubsJ.png'),
    'cardClubsQ': require('../../assets/images/cards/cardClubsQ.png'),
    'cardClubsK': require('../../assets/images/cards/cardClubsK.png'),
  };
  
  const cardKey = `card${suit}${rank}`;
  return cardImageMap[cardKey] || cardImageMap['cardSpadesA'];
}

export function getCardBackSource(cardBack = 'cardBack_blue5.png') {
  return cardBackMap[cardBack] || cardBackMap['cardBack_blue5.png'];
}

