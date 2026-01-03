import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { getCardImageSource } from '../utils/cardImages';
import { CONFIG } from '../game/config';

export default function Card({ card, x = 0, y = 0, scale = 1, cardBack, style }) {
  if (!card) return null;
  
  const source = getCardImageSource(card, cardBack);
  const cardW = Number(CONFIG.cardW) * Number(scale);
  const cardH = Number(CONFIG.cardH) * Number(scale);

  const cardStyle = [
    styles.card,
    {
      width: cardW,
      height: cardH,
      left: Number(x) || 0,
      top: Number(y) || 0,
    },
  ];
  
  if (style) {
    cardStyle.push(style);
  }

  return (
    <Image
      source={source}
      style={cardStyle}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
  },
});

