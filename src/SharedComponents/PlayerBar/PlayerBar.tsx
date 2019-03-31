import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FullScreenPlayer } from './FullScreenPlayer';
import { TrackPreview } from './TrackPreview';

const styles = StyleSheet.create({

});

export class PlayerBar extends React.Component {

  render() {
    return (
      <View>
        {/* <TrackPreview /> */}
        <FullScreenPlayer />
      </View>
    );
  }
}
