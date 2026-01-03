import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card';
import { CONFIG } from '../game/config';

export default function StockPile({ stockCount, x, y, onPress, cardBack, cardW = CONFIG.cardW, cardH = CONFIG.cardH }) {
  if (stockCount === 0) return null;

  const backCard = { faceUp: false, suit: 'S', rank: 'A' };

  return (
    <TouchableOpacity
      style={[styles.container, { left: Number(x), top: Number(y), width: Number(cardW), height: Number(cardH) }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Card card={backCard} x={0} y={0} cardBack={cardBack} style={{ width: Number(cardW), height: Number(cardH) }} />
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{stockCount}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  countContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  countText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

