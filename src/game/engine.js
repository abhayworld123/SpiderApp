export const SUITS = ['S', 'H', 'D', 'C']; // Spades, Hearts, Diamonds, Clubs
export const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

export function createDeck(suitCount = 1) {
  const deck = [];
  
  if (suitCount === 1) {
    // 1 Suit: 8 decks of Spades
    for (let d = 0; d < 8; d++) {
      for (const rank of RANKS) {
        deck.push({ suit: 'S', rank, faceUp: false });
      }
    }
  } else if (suitCount === 2) {
    // 2 Suit: 4 decks each of Spades and Hearts
    for (let d = 0; d < 4; d++) {
      for (const rank of RANKS) {
        deck.push({ suit: 'S', rank, faceUp: false });
        deck.push({ suit: 'H', rank, faceUp: false });
      }
    }
  } else if (suitCount === 4) {
    // 4 Suit: 2 decks each of all suits
    for (let d = 0; d < 2; d++) {
      for (const suit of SUITS) {
        for (const rank of RANKS) {
          deck.push({ suit, rank, faceUp: false });
        }
      }
    }
  }
  
  return shuffle(deck);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function initGame(suitCount = 1) {
  const deck = createDeck(suitCount);
  const tableau = Array.from({ length: 10 }, () => []);

  for (let col = 0; col < 10; col++) {
    const count = col < 4 ? 6 : 5;
    for (let i = 0; i < count; i++) {
      const card = deck.pop();
      card.faceUp = i === count - 1;
      tableau[col].push(card);
    }
  }

  return {
    tableau,
    stock: deck,
    dragging: null,
    completed: 0,
    completedSequences: [],
    suitCount
  };
}

export function canDrag(stack, index, suitCount = 1) {
  // Can only drag if the card at index is face up
  if (!stack[index].faceUp) return false;
  
  // Check if all cards from index to end are in descending sequence and face up
  for (let i = index; i < stack.length - 1; i++) {
    if (!stack[i + 1].faceUp) return false;
    const currentRank = RANKS.indexOf(stack[i].rank);
    const nextRank = RANKS.indexOf(stack[i + 1].rank);
    if (currentRank !== nextRank + 1) return false;
    
    // For 2 and 4 suit games, cards in sequence must be same suit
    if (suitCount > 1 && stack[i].suit !== stack[i + 1].suit) return false;
  }
  return true;
}

export function canDrop(card, targetStack, suitCount = 1) {
  if (!targetStack.length) return true;
  const top = targetStack[targetStack.length - 1];
  const rankMatch = RANKS.indexOf(top.rank) === RANKS.indexOf(card.rank) + 1;
  
  // For 2 and 4 suit games, cards must be same suit
  if (suitCount > 1) {
    return rankMatch && top.suit === card.suit;
  }
  
  return rankMatch;
}

export function checkComplete(stack, suitCount = 1) {
  if (stack.length < 13) return null;
  // Check if last 13 cards form a complete sequence (K down to A)
  // Top card (index length-1) should be A, bottom card (index length-13) should be K
  const last13 = stack.slice(stack.length - 13);
  const firstSuit = last13[0].suit;
  
  for (let i = 0; i < 13; i++) {
    const cardIndex = stack.length - 1 - i;
    if (stack[cardIndex].rank !== RANKS[i]) {
      return null;
    }
    // For 2 and 4 suit games, all cards in sequence must be same suit
    if (suitCount > 1 && stack[cardIndex].suit !== firstSuit) {
      return null;
    }
  }
  // Extract the complete sequence before removing
  const completedSequence = stack.slice(stack.length - 13);
  // Remove the complete sequence
  stack.splice(stack.length - 13, 13);
  return completedSequence;
}

export function dealStock(state) {
  if (state.stock.length === 0) return false;
  
  // Deal one card to each tableau column
  for (let i = 0; i < 10; i++) {
    if (state.stock.length > 0) {
      const card = state.stock.pop();
      card.faceUp = true;
      state.tableau[i].push(card);
    }
  }
  return true;
}

export function checkWin(state) {
  return state.completed === 8 && state.stock.length === 0;
}

