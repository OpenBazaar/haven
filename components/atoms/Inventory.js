import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { primaryTextColor } from '../commonColors';

const styles = {
  wrapper: {
    flexDirection: 'column',
    paddingVertical: 5,
  },
  sku: {
    fontSize: 12,
    fontWeight: 'bold',
    color: primaryTextColor,
  },
  surcharge: {
    fontSize: 12,
    color: primaryTextColor,
  },
  stock: {
    fontSize: 12,
    color: primaryTextColor,
  },
};

export default class Inventory extends PureComponent {
  render() {
    const { inventory } = this.props;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.sku}>
          {inventory.productId}
        </Text>
        <Text style={styles.surcharge}>
          {`Surcharge: $${inventory.surcharge}`}
        </Text>
        <Text style={styles.stock}>
          {`Stock: ${inventory.quantity === -1 ? 'Unlimited' : inventory.quantity}`}
        </Text>
      </View>
    );
  }
}
