import { Platform } from 'react-native';

export const keyboardAvoidingViewSharedProps = Platform.OS === 'ios' ? { behavior: 'padding' } : {};
