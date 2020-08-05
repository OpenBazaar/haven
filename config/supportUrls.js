import { Platform } from 'react-native';
import { version } from '../package.json';

export const FAQ_URL = 'https://gethaven.app/faq';
export const TELEGRAM_URL = 'https://t.me/GetHavenApp';
export const EMAIL_URL = `mailto:haven@ob1.io?subject=Haven%20Customer%20Support&body=%0A%0ABuild%20version:%20${version}%0AOS:%20${Platform.OS}`;
