import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { colors } from '../../colors';
import { fonts } from '../../fonts';
import { metrics } from '../../metrics';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    padding: metrics.paddingVeryLarge,
  },
  albumArt: {
    elevation: 1,
    shadowOffset:{width: 0,  height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    overflow: 'visible',
    height: '100%',
    width: '100%',
  },
  topContainer: {
    flex: 1.3,
    width: '100%',
  },
  bottomContainer: {
    marginVertical: metrics.paddingVeryLarge,
    flex: 1,
  },
  timeText: {
    ...fonts.fontSmall,
    color: colors.textColorDefault,
  },
  songInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 1.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
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
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        blurRadius={90}
        source={albumArt}
      >
        <SafeAreaView forceInset={{top: 'always'}} />
        <View style={styles.topContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Ionicons
              name={'ios-arrow-down'}
              size={25}
              color={colors.iconColorDefault}
            />
            <Text style={{...fonts.fontNormalBold, textAlign: 'center'}}>{source}</Text>
            <Ionicons
              name={'ios-more'}
              size={25}
              color={colors.iconColorDefault}
            />
          </View>
          <Image
            source={albumArt}
            style={styles.albumArt}
            resizeMode="contain"
          />
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

          <View>
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
                  height: 15,
                  width: 15,
                  transform: [
                    {
                      translateX: -8,
                    },
                    {
                      translateY: -5,
                    },
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
              size={32}
              color={colors.iconColorLight}
            />
            <Ionicons
              name={'ios-pause'}
              size={40}
              style={{marginRight: metrics.paddingNormal}}
              color={colors.iconColorLight}
            />
            <Ionicons
              name={'ios-skip-forward'}
              size={32}
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

      </ImageBackground>
    );
  }
}
