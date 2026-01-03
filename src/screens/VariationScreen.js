import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VariationScreen() {
  const navigation = useNavigation();

  const handleVariationSelect = (suitCount) => {
    navigation.navigate('Game', { suitCount });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty</Text>
      <Text style={styles.subtitle}>Choose your Spider Solitaire variation</Text>
      
      <TouchableOpacity
        style={[styles.button, styles.buttonEasy]}
        onPress={() => handleVariationSelect(1)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonTitle}>1 Suit</Text>
        <Text style={styles.buttonSubtitle}>Easy - All cards same suit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonMedium]}
        onPress={() => handleVariationSelect(2)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonTitle}>2 Suit</Text>
        <Text style={styles.buttonSubtitle}>Medium - Spades and Hearts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonHard]}
        onPress={() => handleVariationSelect(4)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonTitle}>4 Suit</Text>
        <Text style={styles.buttonSubtitle}>Hard - All four suits</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaaaaa',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 12,
    minWidth: 280,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonEasy: {
    backgroundColor: '#10b981',
  },
  buttonMedium: {
    backgroundColor: '#f59e0b',
  },
  buttonHard: {
    backgroundColor: '#ef4444',
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonSubtitle: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  backButton: {
    marginTop: 30,
    padding: 15,
  },
  backButtonText: {
    color: '#aaaaaa',
    fontSize: 18,
  },
});

