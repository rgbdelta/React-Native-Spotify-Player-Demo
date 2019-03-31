import React from 'react';
import { StatusBar, View } from 'react-native';
import LibraryScreen from './Screens/LibraryScreen/LibraryScreen';
import { PlayerBar } from './SharedComponents/PlayerBar/PlayerBar';

export default class AppContainer extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <LibraryScreen />
        <PlayerBar />
      </View>
    );
  }
}
