import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { runSpring, toAbsolute } from '../../Utils/AnimationsUtils';
import { FullScreenPlayer } from './FullScreenPlayer';
import { TrackPreview } from './TrackPreview';

const screenHeight = Dimensions.get('window').height;
const previewHeight = 75;

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
  greaterThan,
  and,
  sub,
  or,
  block,
  diffClamp,
  debug,
  clockRunning,
  multiply,
  abs,
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
    const dragging = new Value(0);
    const position = new Value(0);
    const isOpen = new Value(0);
    const clock = new Animated.Clock();

    const absoluteTranslation = abs(gestureTranslation);
    const fullTranslation = -screenHeight + previewHeight;
    const snapPoint = new Animated.Value(-fullTranslation / 10 * 2);

    const openAnim = runSpring({
      clock,
      from: position,
      velocity: new Animated.Value(3),
      toValue: new Animated.Value(fullTranslation),
      scrollEndDragVelocity: new Animated.Value(0),
    });

    const closeAnim = runSpring({
      clock,
      from: position,
      velocity: new Animated.Value(3),
      toValue: new Animated.Value(0),
      scrollEndDragVelocity: new Animated.Value(0),
    });

    const newPosition = diffClamp(
      add(start, gestureTranslation),
      fullTranslation,
      0,
    );

    const animateSnap = cond(
      eq(isOpen, 0),
      closeAnim,
      openAnim,
    );

    const saveAnimStatus = cond(
      eq(clockRunning(clock), 0),
      [
        set(isOpen,
          cond(
            eq(isOpen, 0),
            set(isOpen, 1),
            set(isOpen, 0),
          ),
        ),
      ],
    );

    return cond(
      eq(gestureState, State.ACTIVE),
      [
        cond(dragging, 0, [set(dragging, 1), set(start, position)]),
        diffClamp(
          set(position, newPosition),
          fullTranslation,
          0,
        ),
      ],
      cond(
        eq(gestureState, State.END),
        block([
          // debug('abso', absoluteTranslation),
          // debug('snapPoint', snapPoint),
          // debug('position', position),
          set(dragging, 0),
          // cond(dragging, 0, [set(dragging, 1), set(start, position)]),
          cond(
            greaterThan(
              absoluteTranslation,
              snapPoint,
            ),
            [
              saveAnimStatus,
              animateSnap,
            ],
            animateSnap,
          ),
        ]),
      ),
    );
  }

  private showPlayer() {
    // set(isOpen, 1);
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
