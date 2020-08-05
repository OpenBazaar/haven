import { Alert, Platform } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';

import { APPLE_APP_ID, GOOGLE_PACKAGE_NAME } from '../config/appIDConfig';

export const rateApp = () => {
  const options = {
    AppleAppID: APPLE_APP_ID,
    GooglePackageName: GOOGLE_PACKAGE_NAME,
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
  };
  if (Platform.OS === 'ios') {
    Rate.rate(options);
  } else {
    Alert.alert('Enjoying Haven?', "We'd love to hear your feedback.", [
      { text: 'Later' },
      {
        text: 'Rate Now',
        onPress: () => {
          Rate.rate(options);
        },
      },
    ]);
  }
};

