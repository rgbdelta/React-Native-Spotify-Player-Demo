import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { runSpring } from '../../Utils/AnimationsUtils';
import { FullScreenPlayer } from './FullScreenPlayer';
import { TrackPreview } from './TrackPreview';

const screenHeight = Dimensions.get('window').height;
const previewHeight = 75;
const fullTranslation = new Animated.Value(-screenHeight + previewHeight);
const snapPoint = new Animated.Value((-screenHeight + previewHeight) / 10 * 2);

const styles = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const {
  event,
  add,
  set,
  eq,
  cond,
  Value,
  lessThan,
} = Animated;

export class PlayerBar extends React.Component {

  state = {
    isPlayerVisible: false,
  };

  private dragY = new Value(0);
  private gestureState = new Value(-1);
  private translateY = this.interaction(this.dragY, this.gestureState);

  private onGestureEvent = event([
    {
      nativeEvent: {
        translationY: this.dragY,
        state: this.gestureState,
      },
    },
  ]);

  private interaction(gestureTranslation: Animated.Value<number>, gestureState: Animated.Value<number>) {
    const start = new Value(0);
    const position = new Value(0);
    const clock = new Animated.Clock();

    return cond(
      eq(gestureState, State.ACTIVE),
      [
        // Add dragged distance to current distance
        set(position, add(start, gestureTranslation)),
      ],
      cond(
        eq(gestureState, State.END),
        cond(
          lessThan(add(start, gestureTranslation), snapPoint),
          // Open if greater than
          runSpring({
            clock,
            from: position,
            velocity: new Animated.Value(1),
            toValue: fullTranslation,
            scrollEndDragVelocity: new Animated.Value(0),
          }),
          // Close if less than
          runSpring({
            clock,
            from: position,
            velocity: new Animated.Value(1),
            toValue: new Animated.Value(0),
            scrollEndDragVelocity: new Animated.Value(0),
          }),
        ),
      ),
    );
  }

  private showPlayer() {
    // const clock = new Animated.Clock();

    // this.translateY = runSpring({
    //   clock,
    //   from: new Animated.Value(0),
    //   velocity: new Animated.Value(1),
    //   toValue: fullTranslation,
    //   scrollEndDragVelocity: new Animated.Value(0),
    // });
  }

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onGestureEvent}
      >
        <Animated.View
          style={{
            transform: [{ translateY: this.translateY }],
          } as any}
        >
          <View style={{...styles.playerContainer, height: previewHeight}}>
            <Animated.View
              style={{
                zIndex: 1,
                opacity: Animated.interpolate(
                  this.translateY,
                  {
                    inputRange: [0, 1],
                    outputRange: [1, 1.01],
                  },
                ),
              }}
            >
              <TrackPreview height={previewHeight} onPress={() => this.showPlayer()}/>
            </Animated.View>
            <FullScreenPlayer />
          </View>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
