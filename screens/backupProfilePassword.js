import React, { PureComponent } from 'react';
import { View, Text, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import * as _ from 'lodash';
import RnFs from 'react-native-fs';
import { zip, zipWithPassword, subscribe } from 'react-native-zip-archive';
import moment from 'moment';
import { connect } from 'react-redux';

import NavBackButton from '../components/atoms/NavBackButton';
import InputGroup from '../components/atoms/InputGroup';
import TextInput from '../components/atoms/TextInput';
import Header from '../components/molecules/Header';
import SMTextButton from '../components/atoms/SMTextButton';
import { footerStyles } from '../utils/styles';
import { SERVER_PATH } from '../utils/server';
import { keyboardAvoidingViewSharedProps } from '../utils/keyboard';
import { purgeCache } from '../api/cache';

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
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
  buttonFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
};

class BackupProfilePassword extends PureComponent {
  state = {
    password: '',
    cpassword: '',
    loadingText: null,
  }

  handleBackup = async () => {
    const { peerID } = this.props;
    if (!peerID) {
      return;
    }

    const { password, cpassword } = this.state;
    if (_.isEmpty(password)) {
      Alert.alert('Password empty', 'Please set a password');
      return;
    }
    if (password !== cpassword) {
      Alert.alert('Password mismatch', 'Please set a correct password');
      return;
    }

    this.setState({ loadingText: 'It might take a minute...' });

    try {
      this.targetPath = `${RnFs.DocumentDirectoryPath}/havenBackup_${peerID.substring(0, 6)}_${moment().format('YYYYMMDDhhmmss')}.zip`;

      const targetExists = await RnFs.exists(this.targetPath);
      if (targetExists) {
        await RnFs.unlink(this.targetPath);
      }

      await purgeCache();

      const result = zipWithPassword(SERVER_PATH, this.targetPath, password, 'AES-256');
      subscribe(this.handleZipEvent);
      console.warn('backup done', result);
    } catch (err) {
      console.warn('Backup failed', err);
      this.setState({ loadingText: null });
    }
  }

  handleZipEvent = (event) => {
    if (event.progress === 1) {
      this.setState({ loadingText: null }, () => {
        this.props.navigation.navigate('BackupProfileUpload', { targetPath: this.targetPath });
      });
    }
  }

  handleGoBack = () => {
    this.props.navigation.goBack();
  }

  handlePasswordUpdate = field => (value) => {
    this.setState({ [field]: value });
  }

  render() {
    const { loadingText, password, cpassword } = this.state;
    return (
      <View style={styles.wrapper}>
        <Header left={<NavBackButton />} onLeft={this.handleGoBack} />
        <KeyboardAvoidingView style={{ flex: 1 }} {...keyboardAvoidingViewSharedProps}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.resyncContentContainer}>
            <InputGroup title="Set a password" noPadding noHeaderPadding>
              <TextInput
                title="Password"
                value={password}
                placeholder="Set password"
                onChangeText={this.handlePasswordUpdate('password')}
                required
                secureTextEntry
                autoFocus
              />
              <TextInput
                title="Confirm"
                value={cpassword}
                placeholder="Confirm password"
                onChangeText={this.handlePasswordUpdate('cpassword')}
                required
                noBorder
                secureTextEntry
              />
            </InputGroup>
            <Text style={styles.resyncContent}>
              Set a password and <Text style={styles.bold}>make sure to write it down.</Text>
              {'\nYou\'ll need your password to restore your profile.'}
            </Text>
          </ScrollView>
          <View style={footerStyles.textButtonContainer}>
            <SMTextButton title="NEXT" onPress={this.handleBackup} loadingText={loadingText} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  peerID: _.get(state, 'profile.data.peerID'),
});

export default connect(mapStateToProps)(BackupProfilePassword);
