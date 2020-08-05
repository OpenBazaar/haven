import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';

import Header from '../components/molecules/Header';
import InputGroup from '../components/atoms/InputGroup';
import OptionGroup from '../components/atoms/OptionGroup';
import FormLabelText from '../components/atoms/FormLabelText';

import { setDetails } from '../reducers/createListing';
import NavBackButton from '../components/atoms/NavBackButton';
import { primaryTextColor } from '../components/commonColors';

const wrapperStyle = {
  backgroundColor: '#FFF',
  flex: 1,
};

const textStyle = {
  fontSize: 15,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0,
  textAlign: 'left',
  color: primaryTextColor,
  paddingVertical: 20,
};

class ListingAdvancedOptions extends PureComponent {
  toVariants = () => {
    this.props.navigation.navigate('CustomOptions');
  };

  toStorePolicies = () => {
    this.props.navigation.navigate('AdvancedDetails');
  };

  toCoupons = () => {
    this.props.navigation.navigate('AddListingCoupon');
  };

  renderCouponText = () => {
    const { coupons } = this.props;
    if (coupons.length > 0) {
      return <Text style={textStyle}>{`${coupons.length} coupon${coupons.lengt > 1 ? 's' : ''}`}</Text>;
    }
    return <FormLabelText text="Add coupons" />;
  }

  render() {
    return (
      <View style={wrapperStyle}>
        <Header
          left={<NavBackButton />}
          onLeft={() => {
            this.props.navigation.goBack();
          }}
          title="Advanced"
        />
        <ScrollView>
          <InputGroup title="Variants & Inventory" showPencil onPress={this.toVariants}>
            <OptionGroup noBorder noArrow>
              <FormLabelText text="Add variants and manage your store inventory" />
            </OptionGroup>
          </InputGroup>
          <InputGroup title="Store Policies" showPencil onPress={this.toStorePolicies}>
            <OptionGroup noBorder noArrow>
              <FormLabelText text="Add a return policy or terms of service" />
            </OptionGroup>
          </InputGroup>
          <InputGroup title="Coupons" showPencil onPress={this.toCoupons}>
            <OptionGroup noBorder noArrow>
              {this.renderCouponText()}
            </OptionGroup>
          </InputGroup>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  step: state.createListing.step,
  tags: state.createListing.tags,
  condition: state.createListing.condition,
  coupons: state.createListing.coupons,
  categories: state.createListing.categories,
  termsAndConditions: state.createListing.termsAndConditions,
  refundPolicy: state.createListing.refundPolicy,
  storeTAndC: state.appstate.termsAndConditions,
  storeRefunds: state.appstate.returnPolicy,
});

const mapDispatchToProps = {
  setDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingAdvancedOptions);
