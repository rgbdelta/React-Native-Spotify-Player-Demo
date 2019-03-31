import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { FullScreenPlayer } from './FullScreenPlayer';
import { TrackPreview } from './TrackPreview';

const screenHeight = Dimensions.get('window').height;
const previewHeight = 80;

const styles = StyleSheet.create({

});

const {
  event,
  block,
  add,
  set,
  eq,
  cond,
  debug,
  Value,
  spring,
  lessThan,
  clockRunning,
  startClock,
  stopClock,
  greaterThan,
} = Animated;

interface IRunSpring {
  clock: Animated.Clock;
  from: Animated.Value<number>;
  velocity: Animated.Value<number>; // Initial velocity of the spring animation
  toValue: Animated.Value<number>; // Final value of the animation
  scrollEndDragVelocity: Animated.Value<number>;
}

function runSpring(args: IRunSpring) {
  const {clock, velocity, from, toValue, scrollEndDragVelocity} = args;

  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 0,
    mass: 1,
    stiffness: 50,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, from),
      set(config.toValue, toValue),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, [
      // Once the animation is done, we reset scrollEndDragVelocity to its default value
      set(scrollEndDragVelocity, 0),
      stopClock(clock),
    ]),
    state.position,
  ];
}

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
    const dragging = new Value(0);
    const position = new Value(0);
    const clock = new Animated.Clock();

    return cond(
      eq(gestureState, State.ACTIVE),
      [
        cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
        set(position, add(start, gestureTranslation)),
      ],
      cond(
        eq(gestureState, State.END),
        cond(
          eq(dragging, 1),
          cond(
            lessThan(add(start, gestureTranslation), -400),
            runSpring({
              clock,
              from: position,
              velocity: new Animated.Value(1),
              toValue: new Animated.Value(-screenHeight + previewHeight),
              scrollEndDragVelocity: new Animated.Value(0),
            }),
            runSpring({
              clock,
              from: position,
              velocity: new Animated.Value(1),
              toValue: new Animated.Value(0),
              scrollEndDragVelocity: new Animated.Value(0),
            }),
          ),
        ),
      ),
    );
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
          }}
        >
          <View style={{position: 'absolute', height: previewHeight, zIndex: 1, bottom: 0, left: 0, right: 0}}>
            <Animated.View
              style={{
                zIndex: 1,
                // opacity: this.barOpacity,
              }}
            >
              <TrackPreview height={previewHeight}/>
            </Animated.View>
            <FullScreenPlayer />
          </View>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}
