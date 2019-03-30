import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { metrics } from './metrics';

export const fonts = StyleSheet.create({
  fontNormal: {
    fontSize: metrics.fontNormal,
    color: colors.textColorLight,
  },
  fontNormalBold: {
    fontSize: metrics.fontNormal,
    color: colors.textColorLight,
    fontWeight: 'bold',
  },
});
