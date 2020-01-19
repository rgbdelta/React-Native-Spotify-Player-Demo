import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../colors';
import { fonts } from '../../fonts';
import { metrics } from '../../metrics';

interface IProps {
  height: number;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.backgroundVeryLight,
    zIndex: 2,
    padding: metrics.paddingLarge,
  },
  progressContainer: {
    flexDirection: 'row',
    height: metrics.borderNormal,
    backgroundColor: colors.borderColorDefault,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  progressBar: {
    backgroundColor: colors.borderColorLight,
    height: '100%',
    width: '20%',
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
    color: colors.textColorDefault,
  },
});

export function TrackPreview(props: IProps) {

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{...styles.container, height: props.height}}
      onPress={props.onPress}
    >
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
      </View>
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

    </TouchableOpacity>
  );
}