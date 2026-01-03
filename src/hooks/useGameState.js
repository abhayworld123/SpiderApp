import { useState, useCallback } from 'react';
import { initGame, canDrag, canDrop, checkComplete, dealStock, checkWin } from '../game/engine';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Scale factors for responsive design
const LOGICAL_WIDTH = 1200;
const LOGICAL_HEIGHT = 820;
const SCALE_X = SCREEN_WIDTH / LOGICAL_WIDTH;
const SCALE_Y = SCREEN_HEIGHT / LOGICAL_HEIGHT;

export function useGameState(suitCount = 1) {
  const [state, setState] = useState(() => initGame(suitCount));
  const [dragging, setDragging] = useState(null);
  const [animations, setAnimations] = useState([]);
  const [assistMode, setAssistMode] = useState(false);

  const startNewGame = useCallback(() => {
    setState(initGame(suitCount));
    setDragging(null);
    setAnimations([]);
  }, [suitCount]);

  const handleCardPress = useCallback((x, y) => {
    if (checkWin(state) || dragging) return;

    // x and y are already in logical coordinates (converted in GameScreen)
    const logicalX = x;
    const logicalY = y;

    const cardW = 100;
    const cardH = 145;
    const gapX = 110;
    const gapY = 30;
    const offsetX = 50;
    const offsetY = 120;
    const stockX = 50;
    const stockY = 20;

    // Check stock pile
    if (
      logicalX > stockX &&
      logicalX < stockX + cardW &&
      logicalY > stockY &&
      logicalY < stockY + cardH &&
      state.stock.length > 0
    ) {
      const hasEmptyColumn = state.tableau.some(col => col.length === 0);
      if (hasEmptyColumn) return;

      const newState = { ...state };
      if (dealStock(newState)) {
        newState.tableau.forEach((col, colIndex) => {
          const completed = checkComplete(col, suitCount);
          if (completed) {
            newState.completed++;
            newState.completedSequences.push(completed);
          } else if (col.length) {
            col[col.length - 1].faceUp = true;
          }
        });
        setState(newState);
      }
      return;
    }

    // Check tableau cards
    state.tableau.forEach((col, ci) => {
      for (let i = col.length - 1; i >= 0; i--) {
        const cx = offsetX + ci * gapX;
        const cy = offsetY + i * gapY;

        if (
          logicalX > cx &&
          logicalX < cx + cardW &&
          logicalY > cy &&
          logicalY < cy + cardH &&
          col[i].faceUp &&
          canDrag(col, i, suitCount)
        ) {
          const cards = col.slice(i);
          const newTableau = state.tableau.map((c, idx) =>
            idx === ci ? c.slice(0, i) : [...c]
          );

          const validDrops = assistMode
            ? state.tableau
                .map((c, idx) => (idx !== ci && canDrop(cards[0], c, suitCount) ? idx : null))
                .filter(idx => idx !== null)
            : [];

          setDragging({
            cards,
            from: ci,
            cardOffsetX: logicalX - cx,
            cardOffsetY: logicalY - cy,
            x: cx,
            y: cy,
            validDrops,
          });

      setState(prevState => ({ ...prevState, tableau: newTableau }));
      return;
        }
      }
    });
  }, [state, assistMode, dragging, suitCount]);

  const handleDragMove = useCallback(({ x, y }) => {
    if (!dragging) return;
    // x and y are already in logical coordinates
    const logicalX = x;
    const logicalY = y;
    setDragging({
      ...dragging,
      x: logicalX - dragging.cardOffsetX,
      y: logicalY - dragging.cardOffsetY,
    });
  }, [dragging]);

  const handleDragEnd = useCallback(({ x, y }) => {
    if (!dragging) return;

    const cardW = 100;
    const gapX = 110;
    const offsetX = 50;
    const gapY = 30;
    const offsetY = 120;

    // Use card center position for drop detection (matching web version)
    const cardX = dragging.x + cardW / 2;

    let dropped = false;
    const newState = { ...state };

    for (let ci = 0; ci < newState.tableau.length; ci++) {
      if (ci === dragging.from) continue;

      const col = newState.tableau[ci];
      const cx = offsetX + ci * gapX;

      if (cardX > cx && cardX < cx + cardW) {
        if (canDrop(dragging.cards[0], col, suitCount)) {
          col.push(...dragging.cards);
          const completed = checkComplete(col, suitCount);

          if (completed) {
            newState.completed++;
            newState.completedSequences.push(completed);
          } else {
            if (col.length) {
              col[col.length - 1].faceUp = true;
            }
          }

          dropped = true;
          break;
        }
      }
    }

    if (!dropped) {
      newState.tableau[dragging.from].push(...dragging.cards);
    } else {
      const src = newState.tableau[dragging.from];
      if (src && src.length && !src[src.length - 1].faceUp) {
        src[src.length - 1].faceUp = true;
      }
    }

    setState(newState);
    setDragging(null);
  }, [dragging, state, assistMode]);

  return {
    state,
    dragging,
    animations,
    assistMode,
    setAssistMode,
    startNewGame,
    handleCardPress,
    handleDragMove,
    handleDragEnd,
    isWin: checkWin(state),
  };
}

