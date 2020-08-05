import React from 'react';
import { connect } from 'react-redux';

import TextInput from '../atoms/TextInput';
import InputGroup from '../atoms/InputGroup';
import { convertorsMap } from '../../selectors/currency';

class ShippingPriceEditor extends React.Component {
  onChangeName = (name) => {
    const { item, pos, onChange } = this.props;
    onChange({ ...item, name }, pos);
  };

  onChangePrice = (formated, price) => {
    const { item, pos, onChange } = this.props;
    onChange({ ...item, price }, pos);
  }

  onChangeEstimate = (estimatedDelivery) => {
    const { item, pos, onChange } = this.props;
    onChange({ ...item, estimatedDelivery }, pos);
  }

  onChangeAdditionalPrice = (formated, additionalItemPrice) => {
    const { item, pos, onChange } = this.props;
    onChange({ ...item, additionalItemPrice }, pos);
  }

  render() {
    const { item, pos, localSymbol, removeItem, hideDelete, localMask } = this.props;
    const { name, price, estimatedDelivery, additionalItemPrice } = item;
    return (
      <InputGroup
        title={`Shipping service #${pos + 1}`}
        action={!hideDelete && removeItem}
        actionTitle={!hideDelete && 'Delete'}
      >
        <TextInput
          title="Service"
          value={name}
          required
          placeholder="Standard, Express, etc."
          onChangeText={this.onChangeName}
        />
        <TextInput
          title="Duration"
          defaultValue={estimatedDelivery}
          placeholder="5-7 days"
          required
          onChangeText={this.onChangeEstimate}
        />
        <TextInput
          title="Price"
          value={price}
          required
          placeholder={`${localSymbol}0.00`}
          mask={localMask}
          onChangeText={this.onChangePrice}
          keyboardType="decimal-pad"
        />
        <TextInput
          title="Addl. Price"
          noBorder
          value={additionalItemPrice}
          placeholder={`${localSymbol}0.00`}
          mask={localMask}
          onChangeText={this.onChangeAdditionalPrice}
          keyboardType="decimal-pad"
        />
      </InputGroup>
    );
  }
}

const mapStateToProps = state => ({
  ...convertorsMap(state),
});

export default connect(mapStateToProps)(ShippingPriceEditor);
