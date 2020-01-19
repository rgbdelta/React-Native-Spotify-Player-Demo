import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
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
    backgroundColor: colors.backgroundLight,
    padding: metrics.paddingLarge,
  },
});

export function LibraryScreen() {
  const insets = useSafeArea();

  return (
    <View style={styles.container}>
      <View style={{...styles.navBar, paddingTop: metrics.paddingSmall + insets.top }}>
        <Text style={styles.title}>Your Library</Text>
      </View>

      <ScrollView>
        <MenuRow text="Made for you" icon="ios-sunny" />
      </ScrollView>

    </View>
  );
}

