import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { MenuRow } from './Components/MenuRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default class LibraryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <MenuRow text="Made for you" icon="ios-sunny" />
      </View>
    );
  }
}
