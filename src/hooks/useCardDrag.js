import { useRef } from 'react';
import { PanResponder } from 'react-native';

export function useCardDrag(onDragStart, onDragMove, onDragEnd) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: (evt, gestureState) => {
        if (onDragStart) {
          onDragStart({
            x: evt.nativeEvent.pageX,
            y: evt.nativeEvent.pageY,
          });
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (onDragMove) {
          onDragMove({
            x: evt.nativeEvent.pageX,
            y: evt.nativeEvent.pageY,
            dx: gestureState.dx,
            dy: gestureState.dy,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (onDragEnd) {
          onDragEnd({
            x: evt.nativeEvent.pageX,
            y: evt.nativeEvent.pageY,
          });
        }
      },
    })
  ).current;

  return panResponder;
}

