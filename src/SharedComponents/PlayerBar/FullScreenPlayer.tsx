import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../colors';
import { fonts } from '../../fonts';
import { metrics } from '../../metrics';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    backgroundColor: colors.backgroundDark,
  },
  albumArt: {
    shadowOffset:{width: 0,  height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    overflow: 'visible',
    height: '100%',
    width: '100%',
  },
  topContainer: {
    flex: 1.4,
    width: '100%',
    paddingHorizontal: metrics.paddingVeryLarge,
    paddingTop: metrics.paddingVeryLarge,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: metrics.paddingVeryLarge,
  },
  timeText: {
    ...fonts.fontSmall,
    color: colors.textColorDefault,
  },
  songInfoContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seekBarContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  controlsContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export class FullScreenPlayer extends React.Component {

  render() {
    const albumArt = require('../../../assets/give_up_album.jpg');
    const source = 'Songs';
    const track = 'Nothing Better';
    const artist = 'The Postal Service';
    const currentTime = '0:34';
    const songLength = '3:47';

    return (
      <View
        style={styles.container}
      >
        <Image
          resizeMode="cover"
          blurRadius={90}
          source={albumArt}
          style={{position: 'absolute', height: '100%', width: '100%', opacity: 0.8}}
        />
        <View style={styles.topContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: metrics.paddingVeryLarge,
              marginTop: metrics.paddingLarge,
            }}
          >
            <Ionicons
              name={'ios-arrow-down'}
              size={25}
              color={colors.iconColorDefault}
            />
            <Text style={{...fonts.fontSmallBold, textAlign: 'center'}}>{source}</Text>
            <Ionicons
              name={'ios-more'}
              size={25}
              color={colors.iconColorDefault}
            />
          </View>
          <View style={{flex: 1}} >
            <Image
              source={albumArt}
              style={styles.albumArt}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.songInfoContainer}>
            <View>
              <Text style={fonts.fontLargeBold}>{track}</Text>
              <Text style={{...fonts.fontNormal, color: colors.textColorDefault}}>{artist}</Text>
            </View>
            <Ionicons
              name={'ios-heart'}
              size={32}
              style={{marginRight: metrics.paddingNormal}}
              color={colors.iconColorSuccess}
            />
          </View>

          <View style={styles.seekBarContainer}>
            <View
              style={{
                width: '100%',
                height: 4,
                backgroundColor: colors.borderColorTransparent,
                borderRadius: 5,
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  backgroundColor: colors.borderColorLight,
                  width: '20%',
                  height: '100%',
                  borderRadius: 5,
                }}
              />
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: colors.borderColorLight,
                  height: 13,
                  width: 13,
                  transform: [
                    {translateX: -6},
                    {translateY: -4},
                  ],
                }}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: metrics.paddingSmall}}>
              <Text style={styles.timeText}>
                {currentTime}
              </Text>
              <Text style={styles.timeText}>
                {songLength}
              </Text>
            </View>
          </View>

          <View style={styles.controlsContainer}>
            <Ionicons
              name={'ios-shuffle'}
              size={25}
              style={{marginRight: metrics.paddingNormal}}
              color={colors.iconColorSuccess}
            />
            <Ionicons
              name={'ios-skip-backward'}
              size={30}
              color={colors.iconColorLight}
            />
            <Ionicons
              name={'ios-pause'}
              size={48}
              style={{marginRight: metrics.paddingNormal}}
              color={colors.iconColorLight}
            />
            <Ionicons
              name={'ios-skip-forward'}
              size={30}
              color={colors.iconColorLight}
            />
            <Ionicons
              name={'ios-infinite'}
              size={25}
              style={{marginLeft: metrics.paddingNormal}}
              color={colors.iconColorDefault}
            />
          </View>

          <View style={styles.footerContainer}>
            <Ionicons
              name={'ios-infinite'}
              size={25}
              color={colors.iconColorLight}
              style={{opacity: 0}}
            />
            <Ionicons
              name={'ios-list'}
              size={25}
              color={colors.iconColorDefault}
            />
          </View>
        </View>

      </View>
    );
  }
}
