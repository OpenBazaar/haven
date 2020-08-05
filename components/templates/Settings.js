import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Alert } from 'react-native';
import * as _ from 'lodash';

import InputGroup from '../atoms/InputGroup';
import OptionGroup from '../atoms/OptionGroup';
import FormLabelText from '../atoms/FormLabelText';
import RadioModalFilter from '../molecules/RadioModalFilter';

import countries from '../../config/countries.json';
import currencies from '../../config/localCurrencies.json';

import { patchSettingsRequest } from '../../reducers/settings';
import { primaryTextColor } from '../commonColors';

countries.splice(0, 1);

const styles = {
  notificationLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationLabel: {
    marginRight: 10,
  },
  scrollView: {
    paddingBottom: 12,
  },
  formLabel: {
    width: 150,
  },
  formValue: {
    fontSize: 14,
    color: primaryTextColor,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

class Settings extends PureComponent {
  componentDidMount() {
    const { settings } = this.props;
    const { localCurrency } = settings;
    if (localCurrency === 'VEF') {
      this.handleCurrencyChange('VES');
    }
  }

  getCurrencyLabel = option => option && `${option.name} (${option.symbol})`

  handleOpenResync = () => {
    this.props.navigation.navigate('Resync');
  };

  handleOpenCoinsAccepted = () => {
    this.props.navigation.navigate('AcceptedCoins');
  };

  handleOpenServerLog = () => {
    this.props.navigation.navigate('ServerLog');
  };

  handleGoToNotificationSettings = () => {
    this.props.navigation.navigate('NotificationSettings');
  };

  handleCountryChange = (country) => {
    this.props.patchSettingsRequest({ country: country.toUpperCase() });
  };

  handleCurrencyChange = (currency) => {
    this.props.patchSettingsRequest({ localCurrency: currency });
  };

  handleBackupProfile = () => {
    this.props.navigation.navigate('BackupProfileInit');
  }

  handleConfirmBeforeRestore = () => {
    Alert.alert(
      'Are you sure?',
      'Have you backed up your current store?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'OK', onPress: this.handleRestoreProfile },
      ],
      { cancelable: false },
    );
  }


  handleRestoreProfile = () => {
    this.props.navigation.navigate('RestoreProfileInit');
  }

  render() {
    const {
      toShippingAddress,
      toPolicies,
      toModerators,
      toBlockedNodes,
      toBackupWallet,
      toAnalytics,
      settings,
      isTrackingEvent,
      currencies: acceptedCoins,
    } = this.props;
    const { country, localCurrency } = settings;

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <InputGroup title="Profile">
          <RadioModalFilter
            title="Country"
            secondary
            selected={_.isEmpty(country) ? '' : country.toLowerCase()}
            onChange={this.handleCountryChange}
            options={countries}
          />
          <RadioModalFilter
            title="Currency"
            secondary
            selected={_.isEmpty(localCurrency) ? '' : localCurrency === 'VEF' ? 'VES' : localCurrency}
            onChange={this.handleCurrencyChange}
            options={currencies}
            valueKey="code"
            getLabel={this.getCurrencyLabel}
          />
          <OptionGroup onPress={toShippingAddress} smallPadding>
            <FormLabelText text="Shipping address" />
          </OptionGroup>
          <OptionGroup onPress={toBlockedNodes} noBorder smallPadding>
            <FormLabelText text="Blocked" />
          </OptionGroup>
        </InputGroup>
        <InputGroup title="Notifications">
          <OptionGroup onPress={this.handleGoToNotificationSettings} noBorder smallPadding>
            <FormLabelText text="Push notifications" />
          </OptionGroup>
        </InputGroup>
        <InputGroup title="Store">
          <OptionGroup onPress={toPolicies} smallPadding>
            <FormLabelText text="Policies" />
          </OptionGroup>
          <OptionGroup onPress={toModerators} smallPadding>
            <FormLabelText text="Moderators" />
          </OptionGroup>
          <OptionGroup onPress={this.handleOpenCoinsAccepted} noBorder smallPadding>
            <FormLabelText text="Coins accepted" value={acceptedCoins.length > 0 && `${acceptedCoins.length} selected`} />
          </OptionGroup>
        </InputGroup>
        <InputGroup title="Advanced">
          <OptionGroup onPress={toAnalytics} smallPadding>
            <View style={styles.optionWrapper}>
              <FormLabelText text="Analytics" style={styles.formLabel} />
              <Text style={styles.formValue}>
                {isTrackingEvent ? 'On' : 'Off'}
              </Text>
            </View>
          </OptionGroup>
          <OptionGroup onPress={toBackupWallet} smallPadding>
            <FormLabelText text="Backup wallet" />
          </OptionGroup>
          <OptionGroup onPress={this.handleBackupProfile} smallPadding>
            <FormLabelText text="Backup profile" />
          </OptionGroup>
          <OptionGroup onPress={this.handleConfirmBeforeRestore} smallPadding>
            <FormLabelText text="Restore profile" />
          </OptionGroup>
          <OptionGroup onPress={this.handleOpenResync} smallPadding>
            <FormLabelText text="Resync transactions" />
          </OptionGroup>
          <OptionGroup onPress={this.handleOpenServerLog} smallPadding>
            <FormLabelText text="Server Log" />
          </OptionGroup>
          <FormLabelText text="Version 1.3.7" />
        </InputGroup>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  username: state.appstate.username,
  password: state.appstate.password,
  isTrackingEvent: state.appstate.isTrackingEvent,
  profile: state.profile.data,
  settings: state.settings,
  unreadCount: state.notifications.unread,
  currencies: state.profile.data.currencies,
});

const mapDispatchToProps = {
  patchSettingsRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
