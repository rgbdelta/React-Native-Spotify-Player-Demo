import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../colors';
import { fonts } from '../../../fonts';
import { metrics } from '../../../metrics';

interface IProps {
  text: string;
  icon: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: metrics.paddingNormal,
  },
  menuText: fonts.fontNormal,
});

export function MenuRow(props: IProps) {
  const {text, icon} = props;

  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={32}
        style={{marginRight: metrics.paddingNormal}}
        color={colors.iconColorDefault}
      />
      <Text style={styles.menuText}>{text}</Text>
    </View>
  );
}
