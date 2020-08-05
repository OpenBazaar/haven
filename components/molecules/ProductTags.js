import React from 'react';
import { View } from 'react-native';

import ProductTag from '../atoms/ProductTag';
import ProductSection from '../atoms/ProductSection';

const styles = {
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

export default ({ tags, onPress }) => (
  <ProductSection title="Tags">
    <View style={styles.wrapper}>
      {tags.map((item, idx) => <ProductTag tag={item} key={idx} onPress={onPress} />)}
    </View>
  </ProductSection>
);
