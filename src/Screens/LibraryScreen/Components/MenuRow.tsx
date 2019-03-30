import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
  text: string;
  icon: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});

export class MenuRow extends React.Component<IProps> {
  render() {
    const {text, icon} = this.props;

    return (
      <View style={styles.container}>
        <Ionicons name={icon} size={32} color="green" />
        <Text>{text}</Text>
      </View>
    );
  }
}
