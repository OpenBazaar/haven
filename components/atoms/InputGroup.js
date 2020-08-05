import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { isEmpty } from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  foregroundColor,
  secondaryTextColor,
  linkTextColor,
  primaryTextColor,
  formLabelColor,
  borderColor,
  brandColor,
  secondaryBackgroundColor,
} from '../commonColors';

const styles = {
  wrapper: {
    borderBottomWidth: 1,
    borderColor,
  },
  contentWrapper: {
    paddingHorizontal: 16,
    backgroundColor: foregroundColor,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    marginTop: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleMarginPadding: {
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.1,
    textAlign: 'left',
    color: primaryTextColor,
  },
  requiredMark: {
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: 'red',
  },
  description: {
    fontSize: 11,
    lineHeight: 11,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: brandColor,
    backgroundColor: '#E8F7E7',
    borderRadius: 4,
    marginLeft: 5,
    paddingHorizontal: 6,
    paddingTop: 4,
    paddingBottom: 2,
    overflow: 'hidden',
  },
  actionWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  action: {
    color: linkTextColor,
    textAlign: 'right',
  },
  secondaryAction: {
    color: '#ff3b30',
  },
  attachText: {
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: formLabelColor,
    marginHorizontal: 32,
    paddingVertical: 8,
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
};

const renderRight = (right) => {
  if (typeof right === 'string') {
    return <Text style={styles.title}>{right}</Text>;
  }
  return right;
};

export default ({
  title,
  description,
  children,
  noPadding,
  noHeaderPadding,
  action,
  actionTitle,
  actionType = 'default',
  noBg,
  right,
  noBorder,
  wrapperStyle,
  noHeaderTopPadding,
  contentStyle,
  actionStyle,
  required,
  attachText,
  icon,
  showPencil,
  onPress,
}) => (
  <TouchableWithoutFeedback disabled={!onPress} onPress={onPress}>
    <View style={[styles.wrapper, wrapperStyle, noBorder ? { borderBottomWidth: 0 } : {}]}>
      <View style={[styles.headerWrapper, noHeaderPadding && { paddingHorizontal: 0 }, noHeaderTopPadding && { paddingTop: 0 }]}>
        <View style={[styles.titleWrapper, (title || description) && styles.titleMarginPadding]}>
          {icon && <Image style={styles.coinIcon} source={icon} />}
          {title && (
            <Text style={styles.title}>
              {title}
              {required && <Text style={styles.requiredMark}>*</Text>}
            </Text>
          )}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {actionTitle && (
          <TouchableWithoutFeedback onPress={action}>
            <View style={styles.actionWrapper}>
              <Text
                style={[
                  styles.action,
                  actionType === 'secondary' && styles.secondaryAction,
                  actionStyle,
                ]}
              >
                {actionTitle}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        {showPencil ? (
          <Ionicons name="md-create" color="#00BF65" size={20} />
        ) : (
          right && renderRight(right)
        )}
      </View>
      <View
        style={[
          styles.contentWrapper,
          noPadding ? { paddingHorizontal: 0 } : {},
          noBg ? { backgroundColor: 'transparent', borderColor: 'transparent' } : {},
          contentStyle || {},
        ]}
      >
        {children}
      </View>
      {!isEmpty(attachText) && <Text style={styles.attachText}>{attachText}</Text>}
    </View>
  </TouchableWithoutFeedback>
);
