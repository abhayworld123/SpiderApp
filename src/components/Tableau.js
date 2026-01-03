import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import { CONFIG } from '../game/config';

export default function Tableau({
  tableau,
  offsetX,
  offsetY,
  gapX = CONFIG.gapX,
  gapY = CONFIG.gapY,
  cardW = CONFIG.cardW,
  cardH = CONFIG.cardH,
  cardBack,
  animatingCards = new Map(),
}) {
  return (
    <View style={styles.container}>
      {tableau.map((col, colIndex) => {
        const skipCount = animatingCards.get(colIndex) || 0;
        return (
          <View key={colIndex} style={styles.column}>
            {col.map((card, cardIndex) => {
              // Skip cards that are being animated
              if (cardIndex >= col.length - skipCount) return null;
              
              const x = Number(offsetX) + colIndex * Number(gapX);
              const y = Number(offsetY) + cardIndex * Number(gapY);
              
              return (
                <Card
                  key={`${colIndex}-${cardIndex}`}
                  card={card}
                  x={x}
                  y={y}
                  cardBack={cardBack}
                  style={{ width: Number(cardW), height: Number(cardH) }}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  column: {
    position: 'absolute',
  },
});

