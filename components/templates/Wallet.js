import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import SecureFund from '../atoms/SecureFund';
import WalletCoinItem from '../molecules/WalletCoinItem';
import Balance from '../organism/Balance';
import BackupWallet from './BackupWallet';

import { copiedBackupPhrase } from '../../reducers/appstate';

import { COINS } from '../../utils/coins';
import { eventTracker } from '../../utils/EventTracker';

class Wallet extends PureComponent {
  state = { showBackup: false }

  handleGoToCoinDetails = (coin) => {
    eventTracker.trackEvent('WalletTapped-CoinDetail', { coin });
    this.props.navigation.navigate({
      routeName: 'CryptoBalance',
      params: { coin },
    });
  }

  handleShowBackup = () => {
    this.setState({ showBackup: true });
  }

  handleCloseBackup = () => {
    this.setState({ showBackup: false });
  }

  showSecureFund = () => {
    const { balance, isBackupCopied } = this.props;
    const coins = Object.keys(balance);
    const hasBalance = coins.reduce((prev, coin) => {
      if (prev) {
        return true;
      }
      const { confirmed, unconfirmed } = balance[coin];
      return confirmed > 0 || unconfirmed > 0;
    }, false);
    return hasBalance && !isBackupCopied;
  }

  keyExtractor = (item, index) => `wallet_coin_item_${index}`

  renderItem = ({ item }) => {
    const { balance } = this.props;
    const childProps = {
      coin: item,
      balance: !COINS[item].disabled && balance[item],
      onCoinSelected: this.handleGoToCoinDetails,
    };
    return (
      <WalletCoinItem {...childProps} />
    );
  }

  render() {
    const { balance, copiedBackupPhrase } = this.props;
    const { showBackup } = this.state;
    return (
      <View>
        <Balance balance={balance} />
        {this.showSecureFund() && (
          <React.Fragment>
            <SecureFund onBackup={this.handleShowBackup} />
            <BackupWallet
              show={showBackup}
              onClose={this.handleCloseBackup}
              onFinishBackup={copiedBackupPhrase}
            />
          </React.Fragment>
        )}
        <FlatList
          keyExtractor={this.keyExtractor}
          data={Object.keys(COINS)}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  balance: state.wallet.balance,
  isBackupCopied: state.appstate.isBackupCopied,
});

const mapDispatchToProps = { copiedBackupPhrase };

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Wallet));
