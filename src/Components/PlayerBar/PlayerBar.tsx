import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeArea } from 'react-native-safe-area-context';
import { dragInteraction } from './DragInteraction';
import { FullScreenPlayer } from './FullScreenPlayer';
import { TrackPreview } from './TrackPreview';

const {
  event,
  Value,
} = Animated;

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const position = new Value(0);
const dragY = new Value(0);
const gestureState = new Value<number>(State.UNDETERMINED);
const onGestureEvent = event([
  {
    nativeEvent: {
      translationY: dragY,
      state: gestureState,
    },
  },
]);

export function PlayerBar() {
  const insets = useSafeArea();
  const screenHeight = Dimensions.get('window').height;
  const previewHeight = 50 + insets.top;

  const translationLimit = -screenHeight + previewHeight;
  const snapPoint = -translationLimit / 10 * 2;
  const translateY = dragInteraction(
    position,
    translationLimit,
    snapPoint,
    dragY,
    gestureState
  );

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}
    >
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
        } as any}
      >
        <View style={{ ...styles.playerContainer, height: previewHeight }}>
          <Animated.View
            style={{
              zIndex: 1,
              opacity: Animated.interpolate(
                translateY,
                {
                  inputRange: [0, 1],
                  outputRange: [1, 1.01],
                },
              ),
            }}
          >
            {/* TODO: not sure how to simulate a gesture event imperatively */}
            <TrackPreview
              height={previewHeight}
              onPress={() => dragInteraction(
                position,
                translationLimit,
                snapPoint,
                dragY,
                gestureState
              )}
            />
          </Animated.View>
          <FullScreenPlayer />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}
