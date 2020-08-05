import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList } from 'react-native';

import InputGroup from '../atoms/InputGroup';
import OptionGroup from '../atoms/OptionGroup';
import FormLabelText from '../atoms/FormLabelText';
import SwitchInput from '../atoms/SwitchInput';
import MoreButton from '../atoms/MoreButton';
import VariantItem from '../molecules/VariantItem';
import SingleInventoryEditor from '../organism/DefaultInventoryItem';
import InventoryList from './InventoryList';

import { resetInventory, trackInventory } from '../../reducers/createListing';
import { eventTracker } from '../../utils/EventTracker';

class ListingCustomOptions extends PureComponent {
  onChangeInventoryTracking = (val) => {
    eventTracker.trackEvent('CreateListing-ToggledTrackInventory');
    const { resetInventory, trackInventory, options } = this.props;
    if (options.length >= 0) {
      if (val) {
        trackInventory();
      } else {
        resetInventory();
      }
    }
  };

  keyExtractor = ({ index }) => `variant_${index}`;

  renderItem = ({ item, index }) => {
    const { options } = this.props;
    return <VariantItem item={item} isLast={index === options.length - 1} />;
  };

  render() {
    const {
      options, inventory, inventoryTracking, title, price, images, onAddNew, onEdit,
    } = this.props;
    return (
      <ScrollView>
        <InputGroup title="Variants" showPencil onPress={onEdit}>
          <OptionGroup noBorder noArrow>
            <React.Fragment>
              <FlatList
                data={options}
                renderItem={this.renderItem}
                ListEmptyComponent={<FormLabelText text="Add sizes, colours, materials, etc." />}
              />
              <MoreButton title="Add variant" onPress={onAddNew} />
            </React.Fragment>
          </OptionGroup>
        </InputGroup>
        <InputGroup title="Inventory" noBorder>
          <SwitchInput
            secondary
            title="Track Inventory"
            value={inventoryTracking}
            onChange={this.onChangeInventoryTracking}
            noBorder
            useNative
          />
        </InputGroup>
        {inventory.length > 1 ? (
          <InventoryList
            isTracking={inventoryTracking}
            inventory={inventory}
            toItem={this.props.toInventoryItem}
          />
        ) : (
          <SingleInventoryEditor
            isTracking={inventoryTracking}
            title={title}
            price={price}
            images={images}
            item={inventory[0]}
            onChange={this.props.onUpdateInventory}
          />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({
  createListing: {
    title, price, images, options, inventory, inventoryTracking,
  },
}) => ({
  options,
  inventory,
  inventoryTracking,
  title,
  price,
  images,
});

const mapDispatchToProps = {
  resetInventory,
  trackInventory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingCustomOptions);
