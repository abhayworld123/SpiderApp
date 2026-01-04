# Spider Solitaire

A classic Spider Solitaire card game built with React Native and Expo. Play the timeless card game with smooth drag-and-drop interactions, multiple difficulty levels, and an assist mode to help guide your moves.

## Features

- 🎮 **Classic Spider Solitaire Gameplay** - Full implementation of the traditional Spider Solitaire rules
- 🎯 **Multiple Difficulty Levels** - Choose from 1, 2, or 4 suit variations
- 🖱️ **Drag & Drop** - Intuitive touch-based card dragging and dropping
- 💡 **Assist Mode** - Visual highlights showing valid drop zones when enabled
- 📱 **Cross-Platform** - Runs on iOS, Android, and Web via Expo
- 🎨 **Customizable** - Easy configuration for card backs and colors
- ✨ **Smooth Animations** - Polished UI with responsive interactions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd SpiderSolitaire
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

This will open the Expo DevTools. You can then:

- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your mobile device

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and open on Android emulator
- `npm run ios` - Start and open on iOS simulator
- `npm run web` - Start and open in web browser
- `npm run prebuild` - Generate native code (for custom development builds)

## Game Rules

### Objective

Build eight complete sequences (King to Ace) of the same suit in the foundation piles.

### How to Play

1. **Tableau**: The game starts with 10 columns of cards. The first 4 columns have 6 cards each, the remaining 6 columns have 5 cards each. Only the bottom card in each column is face-up.

2. **Building Sequences**: You can move cards in descending order (King, Queen, Jack, 10, 9, 8, 7, 6, 5, 4, 3, 2, Ace). In 1-suit mode, any suit can be placed on any suit. In 2-suit and 4-suit modes, sequences must be built with cards of the same suit.

3. **Stock Pile**: Click the stock pile (top-left) to deal 10 new cards, one to each column. You can only deal when all columns have at least one card.

4. **Completed Sequences**: When you complete a sequence from King to Ace of the same suit, it automatically moves to the foundation area (top-right).

5. **Winning**: Complete all 8 sequences to win the game!

### Difficulty Levels

- **1 Suit (Easy)**: Uses 8 decks of Spades only
- **2 Suits (Medium)**: Uses 4 decks each of Spades and Hearts
- **4 Suits (Hard)**: Uses 2 decks each of all four suits (Spades, Hearts, Diamonds, Clubs)

## Configuration

You can customize the game appearance by editing `src/game/config.js`:

```javascript
export const CONFIG = {
  cardBack: "cardBack_blue5.png", // Card back image
  backgroundColor: "#171717", // Background color
  cardW: 100, // Card width
  cardH: 145, // Card height
  gapX: 110, // Horizontal gap between cards
  gapY: 30, // Vertical gap between cards
};
```

Available card back options:

- `cardBack_blue1.png` through `cardBack_blue5.png`
- `cardBack_green1.png` through `cardBack_green5.png`
- `cardBack_red1.png` through `cardBack_red5.png`

## Project Structure

```
SpiderSolitaire/
├── assets/                 # Images and card assets
│   └── images/
│       └── cards/         # Card image files
├── src/
│   ├── components/        # React components
│   │   ├── AnimatedCard.js
│   │   ├── Card.js
│   │   ├── CompletedSequences.js
│   │   ├── StockPile.js
│   │   └── Tableau.js
│   ├── game/              # Game logic
│   │   ├── config.js      # Game configuration
│   │   └── engine.js      # Game engine and rules
│   ├── hooks/             # Custom React hooks
│   │   ├── useCardDrag.js
│   │   └── useGameState.js
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/           # Screen components
│   │   ├── GameScreen.js
│   │   ├── MenuScreen.js
│   │   ├── SplashScreen.js
│   │   └── VariationScreen.js
│   └── utils/             # Utility functions
│       └── cardImages.js
├── App.js                 # Main app component
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and tooling
- **React Navigation** - Navigation library
- **React Native Gesture Handler** - Touch gesture handling
- **React Hooks** - State management and side effects

## Development

### Key Components

- **GameScreen**: Main game interface with drag-and-drop logic
- **useGameState**: Custom hook managing game state and logic
- **engine.js**: Core game rules and card manipulation
- **Tableau**: Renders the 10 columns of cards
- **StockPile**: Displays remaining cards to deal

### Adding Features

The codebase is structured to make it easy to add new features:

- Game logic: Modify `src/game/engine.js`
- UI components: Add to `src/components/`
- Screens: Add to `src/screens/` and update navigation
- Configuration: Edit `src/game/config.js`

## Building for Production

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

Or use EAS Build (recommended):

```bash
eas build --platform ios
eas build --platform android
```

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

## Acknowledgments

- Card assets from [source if applicable]
- Built with Expo and React Native
