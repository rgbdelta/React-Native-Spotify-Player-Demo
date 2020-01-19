import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LibraryScreen } from './Screens/LibraryScreen/LibraryScreen';
import { PlayerBar } from './Components/PlayerBar/PlayerBar';

export default function AppContainer() {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <LibraryScreen />
        <PlayerBar />
      </View>
    </SafeAreaProvider>
  );
}
