import React, { useCallback, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  PanResponder,
} from 'react-native';
import { useGameState } from '../hooks/useGameState';
import Tableau from '../components/Tableau';
import StockPile from '../components/StockPile';
import CompletedSequences from '../components/CompletedSequences';
import Card from '../components/Card';
import { CONFIG } from '../game/config';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const LOGICAL_WIDTH = 1200;
const LOGICAL_HEIGHT = 820;
const SCALE_X = SCREEN_WIDTH / LOGICAL_WIDTH;
const SCALE_Y = SCREEN_HEIGHT / LOGICAL_HEIGHT;

// Game layout constants
const cardW = 100;
const cardH = 145;
const gapX = 110;
const gapY = 30;
const offsetX = 50;
const offsetY = 120;
const stockX = 50;
const stockY = 20;
const completedX = 1050;
const completedY = 20;

export default function GameScreen({ route }) {
  const navigation = useNavigation();
  const suitCount = route?.params?.suitCount || 1;
  
  const {
    state,
    dragging,
    assistMode,
    setAssistMode,
    startNewGame,
    handleCardPress,
    handleDragMove,
    handleDragEnd,
    isWin,
  } = useGameState(suitCount);

  // Safety check - don't render if state is not ready
  if (!state || !state.tableau) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </View>
    );
  }

  const gameAreaRef = useRef(null);
  const headerRef = useRef(null);
  const [gameAreaLayout, setGameAreaLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [headerLayout, setHeaderLayout] = useState({ height: 0 });

  // Use refs to access latest values in PanResponder callbacks
  const draggingRef = useRef(dragging);
  draggingRef.current = dragging;

  // Helper: map touch to logical coordinates (1200x820) using gameArea layout
  const getTouchCoordinates = useCallback((evt) => {
    const { pageX, pageY } = evt.nativeEvent;

    if (!gameAreaLayout.width || !gameAreaLayout.height) {
      return { x: -1, y: -1 };
    }

    // Coordinates relative to the game area
    const relativeX = pageX - gameAreaLayout.x;
    const relativeY = pageY - gameAreaLayout.y;

    // Map to logical space (same as web getMouse)
    const logicalX = (relativeX / gameAreaLayout.width) * LOGICAL_WIDTH;
    const logicalY = (relativeY / gameAreaLayout.height) * LOGICAL_HEIGHT;

    return { x: logicalX, y: logicalY };
  }, [gameAreaLayout]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // If already dragging, we need to continue being the responder
          if (draggingRef.current) return true;
          // Otherwise, become responder if there's any movement (to start dragging)
          return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
        },
        onPanResponderGrant: (evt) => {
          // Only start a new drag if not already dragging
          if (draggingRef.current) return;
          const { x, y } = getTouchCoordinates(evt);
          // Only process if layout is ready and coordinates are valid
          if (gameAreaLayout.width > 0 && gameAreaLayout.height > 0 && x >= 0 && y >= 0) {
            handleCardPress(x, y);
          }
        },
        onPanResponderMove: (evt) => {
          // Only handle move if we're dragging
          if (!draggingRef.current) return;
          const { x, y } = getTouchCoordinates(evt);
          // Update drag position even if coordinates seem invalid (they might be edge cases)
          handleDragMove({ x, y });
        },
        onPanResponderRelease: (evt) => {
          // Only handle release if we're dragging
          if (!draggingRef.current) return;
          const { x, y } = getTouchCoordinates(evt);
          handleDragEnd({ x, y });
        },
        onPanResponderTerminate: (evt) => {
          // Only handle terminate if we're dragging
          if (!draggingRef.current) return;
          const { x, y } = getTouchCoordinates(evt);
          handleDragEnd({ x, y });
        },
      }),
    [getTouchCoordinates, handleCardPress, handleDragMove, handleDragEnd, gameAreaLayout]
  );

  const handleStockPress = useCallback(() => {
    // Stock press coordinates in logical space
    const logicalX = stockX + cardW / 2;
    const logicalY = stockY + cardH / 2;
    handleCardPress(logicalX, logicalY);
  }, [handleCardPress]);

  const scaledOffsetX = offsetX * SCALE_X;
  const scaledOffsetY = offsetY * SCALE_Y;
  const scaledGapX = gapX * SCALE_X;
  const scaledGapY = gapY * SCALE_Y;
  const scaledCardW = cardW * SCALE_X;
  const scaledCardH = cardH * SCALE_Y;
  const scaledStockX = stockX * SCALE_X;
  const scaledStockY = stockY * SCALE_Y;
  const scaledCompletedX = completedX * SCALE_X;
  const scaledCompletedY = completedY * SCALE_Y;

  return (
    <View style={styles.container}>
      <View
        ref={headerRef}
        style={styles.header}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderLayout({ height });
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.restartButton}
          onPress={startNewGame}
        >
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.assistButton, assistMode ? styles.assistButtonActive : null]}
          onPress={() => setAssistMode(!assistMode)}
        >
          <Text style={styles.assistButtonText}>
            Assist: {assistMode ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        ref={gameAreaRef}
        style={styles.gameArea}
        {...panResponder.panHandlers}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setGameAreaLayout({ x, y, width, height });
        }}
      >
        <StockPile
          stockCount={state.stock.length}
          x={scaledStockX}
          y={scaledStockY}
          onPress={handleStockPress}
          cardBack={CONFIG.cardBack}
          cardW={scaledCardW}
          cardH={scaledCardH}
        />

        <Tableau
          tableau={state.tableau}
          offsetX={scaledOffsetX}
          offsetY={scaledOffsetY}
          gapX={scaledGapX}
          gapY={scaledGapY}
          cardW={scaledCardW}
          cardH={scaledCardH}
          cardBack={CONFIG.cardBack}
        />

        {dragging && (
          <View style={styles.draggingContainer}>
            {dragging.cards.map((card, i) => (
              <Card
                key={i}
                card={card}
                x={dragging.x * SCALE_X}
                y={(dragging.y + i * gapY) * SCALE_Y}
                cardBack={CONFIG.cardBack}
                style={{ width: scaledCardW, height: scaledCardH }}
              />
            ))}
          </View>
        )}

        {assistMode && dragging && dragging.validDrops && (
          <View>
            {dragging.validDrops.map((colIndex) => {
              const x = (offsetX + colIndex * gapX) * SCALE_X;
              const y = scaledOffsetY;
              const height = SCREEN_HEIGHT - y;
              return (
                <View
                  key={colIndex}
                  style={[
                    styles.validDropHighlight,
                    {
                      left: Number(x),
                      top: Number(y),
                      width: Number(scaledCardW),
                      height: Number(height),
                    },
                  ]}
                />
              );
            })}
          </View>
        )}

        <CompletedSequences
          completedSequences={state.completedSequences}
          x={scaledCompletedX}
          y={scaledCompletedY}
          cardBack={CONFIG.cardBack}
          cardW={scaledCardW}
          cardH={scaledCardH}
        />
      </View>

      <Modal visible={!!isWin} transparent={true} animationType="fade">
        <View style={styles.winModal}>
          <View style={styles.winContent}>
            <Text style={styles.winTitle}>You Win!</Text>
            <TouchableOpacity
              style={styles.winButton}
              onPress={() => {
                startNewGame();
              }}
            >
              <Text style={styles.winButtonText}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.winButton}
              onPress={() => {
                startNewGame();
                navigation.goBack();
              }}
            >
              <Text style={styles.winButtonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONFIG.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  restartButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  assistButton: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  assistButtonActive: {
    backgroundColor: '#10b981',
  },
  assistButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  draggingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  validDropHighlight: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    borderWidth: 3,
    borderColor: 'rgba(0, 255, 0, 0.6)',
  },
  winModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winContent: {
    backgroundColor: '#1f2937',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 300,
  },
  winTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  winButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  winButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

