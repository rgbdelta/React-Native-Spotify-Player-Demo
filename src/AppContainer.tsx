import React from 'react';
import { View, StatusBar } from 'react-native';
import LibraryScreen from './Screens/LibraryScreen/LibraryScreen';

export default class AppContainer extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <LibraryScreen />
      </View>
    );
  }
}
