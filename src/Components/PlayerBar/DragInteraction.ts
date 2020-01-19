import { State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { runSpring } from '../../Utils/AnimationsUtils';

const {
  add,
  set,
  eq,
  cond,
  Value,
  lessThan,
  greaterThan,
  and,
  block,
  clockRunning,
  abs,
} = Animated;

export const dragInteraction = (
  position: Animated.Value<number>,
  translationLimit: number,
  snapPoint: number,
  gestureTranslation: Animated.Value<number>,
  gestureState: Animated.Value<number>
) => {
  const start = new Value(0);
  const dragging = new Value(0);
  const isOpen = new Value(0);
  const clock = new Animated.Clock();
  
  const openAnim = runSpring({
    clock,
    from: position,
    velocity: new Animated.Value(3),
    toValue: new Animated.Value(translationLimit),
    scrollEndDragVelocity: new Animated.Value(0),
  });

  const closeAnim = runSpring({
    clock,
    from: position,
    velocity: new Animated.Value(3),
    toValue: new Animated.Value(0),
    scrollEndDragVelocity: new Animated.Value(0),
  });

  const newPosition = cond(
    lessThan(
      add(start, gestureTranslation),
      translationLimit,
    ),
    translationLimit,
    add(start, gestureTranslation),
  );

  const animateSnap = cond(
    eq(isOpen, 0),
    closeAnim,
    openAnim,
  );

  const saveOpenStatus = cond(
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
      set(position, newPosition),
    ],
    cond(
      eq(gestureState, State.END),
      block([
        set(dragging, 0),
        cond(
          and(
            // Check if swiped passed the snap threshold
            greaterThan(
              abs(gestureTranslation),
              snapPoint,
            ),
            // Don't snap if full preview is open and dragging up
            cond(
              eq(isOpen, 1),
              lessThan(translationLimit, add(position, gestureTranslation)),
              1,
            ),
          ),
          [
            // Snap to new position
            saveOpenStatus,
            animateSnap,
          ],
          // Snap back
          animateSnap,
        ),
      ]),
      set(start, position),
    ),
  );
}
