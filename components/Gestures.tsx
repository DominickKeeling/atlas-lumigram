import React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

type GesturesProps = {
  onDoubleTap: () => void;
  onLongPress: () => void;
  children: React.ReactNode;
};

const Gestures = ({ onDoubleTap, onLongPress, children }: GesturesProps) => {
  const longPressGestures = Gesture.LongPress()
  .minDuration(500)
  .onStart(() => console.log("Long Press Started"))
  .onEnd((_event, success) => {
    if (success) {
      console.log("Long Press Detected!");
      runOnJS(onLongPress)();
    }
  });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(200)
    .onStart(() => console.log("Double Tap Started"))
    .onEnd(() => {
      console.log("Double Tap Detected!");
      runOnJS(onDoubleTap)();
    });

    const combinedGestures = Gesture.Simultaneous(longPressGestures, doubleTapGesture);

    return (
      <GestureDetector gesture={combinedGestures}>
        <View>{children}</View>
      </GestureDetector>
    )
};

export default Gestures;