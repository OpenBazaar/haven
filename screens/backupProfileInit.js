import React, { PureComponent } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import * as _ from 'lodash';

import Badge from '../components/atoms/Badge';
import NavBackButton from '../components/atoms/NavBackButton';
import Header from '../components/molecules/Header';
import { brandColor, bgHightlightColor } from '../components/commonColors';
import { footerStyles } from '../utils/styles';
import SMTextButton from '../components/atoms/SMTextButton';

const UploadImg = require('../assets/images/upload.png');

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    minHeight: 500,
  },
  headerWrapper: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  resyncTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    lineHeight: 26,
  },
  transparentBetaBadge: {
    opacity: 0,
    marginLeft: 10,
  },
  betaBadge: {
    marginLeft: 10,
  },
  resyncContent: {
    marginTop: 24,
    width: '100%',
    fontSize: 15,
    color: '#404040',
    lineHeight: 26,
  },
  bold: {
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 24,
    width: 160,
    height: 160,
    backgroundColor: '#F2FBF3',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
};

export default class BackupProfileInit extends PureComponent {
  handleSetPassword = () => {
    this.props.navigation.navigate('BackupProfilePassword');
  }

  handleGoBack = () => this.props.navigation.goBack()

  render() {
    return (
      <View style={styles.wrapper}>
        <Header left={<NavBackButton />} onLeft={this.handleGoBack} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerWrapper}>
            <Text style={styles.resyncTitle}>Back up profile</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={UploadImg} />
          </View>
          <Text style={styles.resyncContent}>
            {'Ensure your data is safe by backing it up\nfrequently.'}
            <Text style={styles.bold}>
              {' For the time being, you\'re required to manually back up your data. '}
            </Text>
            {'We\'ll be rolling out a better backup system in the future.'}
          </Text>
          <Text style={styles.resyncContent}>
            Your backup will include all of your data, including wallet funds.
          </Text>
        </ScrollView>
        <View style={footerStyles.textButtonContainer}>
          <SMTextButton title="NEXT" onPress={this.handleSetPassword} />
        </View>
      </View>
    );
  }
}
