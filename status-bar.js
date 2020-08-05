import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const iOSStatusBarHeight = ifIphoneX(44, 20);

export const statusbarHeight = Platform.OS === 'ios' ? iOSStatusBarHeight : 24;

export const StatusBarSpacer = ({ backgroundColor = 'transparent' }) => {
  if (Platform.OS === 'ios') {
    return (
      <View pointerEvents="none" style={{ height: iOSStatusBarHeight, backgroundColor }} />
    );
  } else {
    return null;
  }
};

export default function (props) {
  const { backgroundColor } = props;
  if (Platform.OS === 'ios') {
    return (
      <View style={{ height: iOSStatusBarHeight, backgroundColor }}>
        <StatusBar {...props} />
      </View>
    );
  } else {
    return (
      <View style={{ backgroundColor }}>
        <StatusBar {...props} />
      </View>
    );
  }
}
