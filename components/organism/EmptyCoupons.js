import React from 'react';
import { View, Text, Image } from 'react-native';

import HollowButton from '../atoms/HollowButton';

import CouponIcon from '../../assets/icons/coupon.png';

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#8a8a8f',
    marginBottom: 10,
  },
  img: {
    width: 49.1,
    height: 49.1,
    marginBottom: 11.5,
  },
};

export default ({ onAdd }) => (
  <View style={styles.wrapper}>
    <Image style={styles.img} source={CouponIcon} />
    <Text style={styles.text}>You haven’t added any coupons</Text>
    <HollowButton title="Add coupon" onPress={onAdd} />
  </View>
);
