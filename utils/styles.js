import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Platform, Dimensions } from 'react-native';

import { foregroundColor, secondaryTextColor, borderColor, linkTextColor } from '../components/commonColors';
import { statusbarHeight } from '../status-bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const bgRatio = 226.0 / 750;

export const cellStyles = {
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  separatorContainer: {
    height: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: borderColor,
  },
};

export const screenWrapper = {
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
};

export const wrapperStyles = {
  bottomWrapper: {
    flex: 1,
    paddingBottom: ifIphoneX(34, 0),
    backgroundColor: 'white',
  },
  bottomWrapperExternalStore: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
};

export const chatStyles = {
  wrapper: {
    backgroundColor: foregroundColor,
    flexDirection: 'column',
  },
  avatarImage: {
    width: 44,
    height: 44,
    marginVertical: 6,
    marginLeft: 13,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
    marginRight: 5,
  },
  handle: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: secondaryTextColor,
  },
  unread: {
    color: '#000000',
    fontWeight: 'bold',
  },
  textWrapper: {
    paddingLeft: 12,
    paddingVertical: 8,
    flex: 1,
  },
  messageButton: {
    marginRight: 16,
  },
  bgWrapper: {
    backgroundColor: 'white',
    flex: 1,
  },
};

export const actionSheetStyles = {
  buttonText: {
    fontSize: 15,
    color: linkTextColor,
  },
  buttonBox: {
    height: 50,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
};

export const onboardingStyles = {
  header: {
    height: (SCREEN_WIDTH * bgRatio) + (Platform.OS === 'ios' ? statusbarHeight : 0),
  },
  headerContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '30%',
  },
};

export const footerStyles = {
  roundButtonContainer: {
    marginBottom: ifIphoneX(17, 0),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  textButtonContainer: {
    marginRight: 24,
    marginBottom: ifIphoneX(48, 28),
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
};
