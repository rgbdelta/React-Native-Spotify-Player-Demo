import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { metrics } from './metrics';

export const fonts = StyleSheet.create({
  fontSmall: {
    fontSize: metrics.fontSmall,
    color: colors.textColorLight,
  },
  fontSmallBold: {
    fontSize: metrics.fontSmall,
    color: colors.textColorLight,
    fontWeight: 'bold',
  },
  fontNormal: {
    fontSize: metrics.fontNormal,
    color: colors.textColorLight,
  },
  fontNormalBold: {
    fontSize: metrics.fontNormal,
    color: colors.textColorLight,
    fontWeight: 'bold',
  },
  fontLarge: {
    fontSize: metrics.fontLarge,
    color: colors.textColorLight,
  },
  fontLargeBold: {
    fontSize: metrics.fontLarge,
    color: colors.textColorLight,
    fontWeight: 'bold',
  },
});
