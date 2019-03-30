import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { colors } from '../colors';
import { fonts } from '../fonts';
import { metrics } from '../metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundVeryLight,
    padding: metrics.paddingLarge,
  },
  progressContainer: {
    flexDirection: 'row',
    height: metrics.borderNormal,
    backgroundColor: colors.borderColorDefault,
  },
  progressBar: {
    backgroundColor: colors.borderColorLight,
    height: '100%',
    width: '50%',
  },
  playerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artistText: {
    ...fonts.fontNormal,
    color: colors.textColorLight,
  },
  albumText: {
    color: colors.textColorDefault
  },
});

export class PlayerBar extends React.Component {

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
        <View style={styles.container}>
          <View style={styles.playerTextContainer}>
            <Ionicons
              name={'ios-heart'}
              size={32}
              style={{marginRight: metrics.paddingNormal}}
              color={colors.iconColorSuccess}
            />
            <Text style={styles.artistText}>
              Nothing Better •
              <Text style={styles.albumText}> The Postal Service</Text>
            </Text>
            <Ionicons
              name={'ios-pause'}
              size={32}
              style={{marginRight: metrics.paddingNormal}}
              color={colors.iconColorDefault}
            />
          </View>

          <SafeAreaView  forceInset={{ top: 'always' }}/>
        </View>
      </View>
    );
  }
}
