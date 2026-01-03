import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { CONFIG } from '../game/config';

export default function CompletedSequences({
  completedSequences,
  x,
  y,
  cardBack,
  cardW = CONFIG.cardW,
  cardH = CONFIG.cardH,
}) {
  if (completedSequences.length === 0) return null;

  const areaHeight = Math.min(completedSequences.length * 15 + 40, 250);
  const scaledCardW = Number(cardW) * 0.6;

  return (
    <View style={[styles.container, { left: Number(x), top: Number(y) }]}>
      <View style={[styles.background, { height: areaHeight, width: scaledCardW + 20 }]}>
        <Text style={styles.label}>
          Completed: {completedSequences.length}/8
        </Text>
        {completedSequences.map((sequence, index) => {
          const topCard = sequence[0]; // First card is K (bottom of sequence)
          const offset = index * 2;
          const cardX = offset;
          const cardY = 20 + index * 15;
          
          return (
            <Card
              key={index}
              card={topCard}
              x={cardX}
              y={cardY}
              style={{ width: scaledCardW, height: Number(cardH) * 0.6 }}
              cardBack={cardBack}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
});

