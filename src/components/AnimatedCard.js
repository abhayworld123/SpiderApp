import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Card from './Card';

export default function AnimatedCard({ card, startX, startY, targetX, targetY, duration = 300, onComplete, cardBack, scale = 1 }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(scale)).current;

  useEffect(() => {
    translateX.setValue(startX);
    translateY.setValue(startY);
    scaleAnim.setValue(scale);

    const animX = Animated.timing(translateX, {
      toValue: Number(targetX) || 0,
      duration: Number(duration) || 300,
      useNativeDriver: false,
    });

    const animY = Animated.timing(translateY, {
      toValue: Number(targetY) || 0,
      duration: Number(duration) || 300,
      useNativeDriver: false,
    });

    const animScale = Animated.timing(scaleAnim, {
      toValue: Number(scale) || 1,
      duration: Number(duration) || 300,
      useNativeDriver: false,
    });

    Animated.parallel([animX, animY, animScale]).start(() => {
      if (onComplete) onComplete();
    });
  }, [startX, startY, targetX, targetY, duration, scale]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: translateX,
          top: translateY,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Card card={card} x={0} y={0} cardBack={cardBack} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

