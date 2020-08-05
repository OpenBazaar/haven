import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert, AsyncStorage, ScrollView } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Header from '../components/molecules/Header';
import FullButton from '../components/atoms/FullButton';
import { formLabelColor } from '../components/commonColors';
import { resyncBlockchain } from '../api/wallet';
import { timeSince } from '../utils/time';
import NavBackButton from '../components/atoms/NavBackButton';

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: ifIphoneX(34, 0),
  },
  resyncContentContainer: {
    flex: 1,
    padding: 16,
  },
  resyncTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    lineHeight: 26,
  },
  resyncContent: {
    marginTop: 16,
    fontSize: 15,
    color: '#404040',
    lineHeight: 26,
  },
  resyncFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resyncLastTime: {
    fontSize: 14,
    color: formLabelColor,
  },
  resyncing: {
    fontSize: 14,
    color: 'black',
  },
  resyncButton: {
    width: '35%',
    margin: 0,
    height: 46,
  },
};

class Resync extends PureComponent {
  state = {
    resyncing: false,
  }

  componentDidMount() {
    setInterval(this.handleTick, 1000);
  }

  handleResync = async () => {
    try {
      this.setState({ resyncing: true });
      await resyncBlockchain();
      const secs = (new Date().getTime()).toString();
      await AsyncStorage.setItem('lastSyncedDate', secs);
    } catch (err) {
      Alert.alert('Unknown error!');
    } finally {
      setTimeout(() => {
        this.setState({ resyncing: false });
      }, 2000);
    }
  }

  handleTick = async () => {
    const lastSyncSeconds = await AsyncStorage.getItem('lastSyncedDate');
    if (lastSyncSeconds) {
      this.setState({
        lastSyncedAgo: timeSince(new Date(parseInt(lastSyncSeconds, 10)), true),
      });
    }
  }

  handleGoBack = () => this.props.navigation.goBack()

  render() {
    const { resyncing, lastSyncedAgo } = this.state;

    return (
      <View style={styles.wrapper}>
        <Header
          left={<NavBackButton />}
          onLeft={this.handleGoBack}
        />
        <View style={styles.resyncContentContainer}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <Text style={styles.resyncTitle}>Resync transactions</Text>
            <Text style={styles.resyncContent}>
              {'If you believe you’re missing an order, or if your order details are out-of-sync with a buyer/seller, '}
              {'you can rescan the blockchain for transactions related to your order.'}
            </Text>
            <Text style={styles.resyncContent}>
              {'Resyncing transactions doesn’t need to be performed frequently. '}
              {'It should only be done if you think there’s a problem. A scan is performed each time you start the app.'}
            </Text>
            <Text style={styles.resyncContent}>
              {'You may leave this view while the resync process is active.'}
            </Text>
            <View style={{ flex: 1 }} />
          </ScrollView>
          <View style={styles.resyncFooter}>
            {resyncing ? (
              <Text style={styles.resyncing}>Resyncing...</Text>
            ) : (
              <Text style={styles.resyncLastTime}>{lastSyncedAgo && `Resynced ${lastSyncedAgo} ago`}</Text>
            )}
            <FullButton
              wrapperStyle={styles.resyncButton}
              title="Resync"
              onPress={this.handleResync}
              loading={resyncing}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  username: state.appstate.username,
  password: state.appstate.password,
});

export default connect(mapStateToProps)(Resync);
