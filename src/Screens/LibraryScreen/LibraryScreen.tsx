import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { colors } from '../../colors';
import { fonts } from '../../fonts';
import { metrics } from '../../metrics';
import { MenuRow } from './Components/MenuRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  title: {
    ...fonts.fontNormalBold,
    textAlign: 'center',
  },
  navBar: {
    padding: metrics.paddingNormal,
  },
});

export default class LibraryScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: colors.backgroundLight}} >
          <SafeAreaView />
          <View style={styles.navBar}>
            <Text style={styles.title}>Your Library</Text>
          </View>
        </View>

        <ScrollView>
          <MenuRow text="Made for you" icon="ios-sunny" />
        </ScrollView>

      </View>
    );
  }
}
