import React from 'react';
import { View, Text, Image } from 'react-native';

import HollowButton from '../atoms/HollowButton';

import CouponIcon from '../../assets/icons/shipping.png';

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
    width: 67.4,
    height: 49,
    marginBottom: 11.5,
  },
};

export default ({ onAdd }) => (
  <View style={styles.wrapper}>
    <Image style={styles.img} source={CouponIcon} />
    <Text style={styles.text}>You haven’t added any shipping options</Text>
    <HollowButton title="Add shipping option" onPress={onAdd} />
  </View>
);
