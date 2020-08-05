import { Platform } from 'react-native';

export const navHeightStyle = Platform.select({
  ios: {
    height: 44,
  },
  android: {
    height: 56,
  },
});

export const avatarSize = Platform.select({
  ios: {
    width: 32,
    height: 32,
  },
  android: {
    width: 36,
    height: 36,
  },
});

export const avatarHolderSize = Platform.select({
  ios: {
    width: 36,
    height: 36,
  },
  android: {
    width: 40,
    height: 40,
  },
});

export const tabNotifBadgeSize = Platform.select({
  ios: {
    width: 20,
    height: 20,
  },
  android: {
    width: 21,
    height: 21,
  },
});

export const notifBadgeSize = Platform.select({
  ios: {
    width: 23,
    height: 23,
  },
  android: {
    width: 24,
    height: 24,
  },
});

export const tabBadgeStyle = Platform.select({
  ios: {
    position: 'absolute',
    right: -5,
    top: 5,
  },
  android: {
    position: 'absolute',
    right: -5,
    top: 1,
  },
});

export const badgeStyle = Platform.select({
  ios: {
    position: 'absolute',
    right: -9,
    top: 0,
  },
  android: {
    position: 'absolute',
    right: -10,
    top: 1,
  },
});
