
import Animated from 'react-native-reanimated';

const {
  set,
  cond,
  Value,
  spring,
  clockRunning,
  startClock,
  stopClock,
  lessThan,
  multiply,
  block,
} = Animated;

interface IRunSpring {
  clock: Animated.Clock;
  from: Animated.Value<number>;
  velocity: Animated.Value<number>; // Initial velocity of the spring animation
  toValue: Animated.Value<number>; // Final value of the animation
  scrollEndDragVelocity: Animated.Value<number>;
}

export function runSpring(args: IRunSpring) {
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

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, from),
      set(config.toValue, toValue),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(
      state.finished,
      [
        // Once the animation is done, we reset scrollEndDragVelocity to its default value
        set(scrollEndDragVelocity, 0),
        set(from, toValue),
        stopClock(clock),
      ],
    ),
    state.position,
  ]);
}
