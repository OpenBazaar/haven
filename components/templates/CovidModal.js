import React from 'react';
import { Text, ScrollView } from 'react-native';

import NavCloseButton from '../atoms/NavCloseButton';
import DescriptionText from '../atoms/DescriptionText';
import Button from '../atoms/FullButton';
import Header from '../molecules/Header';
import { OBLightModal } from '../templates/OBModal';

import InputGroup from '../atoms/InputGroup';

const styles = {
  contentWrapper: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonWrapper: {
    marginBottom: 10,
  },
};

const scrollStyleProps = {
  style: {
    flex: 1,
  },
  // showsVerticalScrollIndicator: false,
};

export default class CovidModal extends React.Component {
  render() {
    const { show, onClose, onCreateListing } = this.props;
    return (
      <OBLightModal
        animationType="slide"
        transparent
        visible={show}
        onRequestClose={onClose}
      >
        <Header
          left={<NavCloseButton />}
          modal
          onLeft={onClose}
        />
        <InputGroup
          wrapperStyle={styles.contentWrapper}
          contentStyle={styles.contentWrapper}
          title="Essential Supplies Needed (COVID-19)"
          noBorder
        >
          <ScrollView {...scrollStyleProps}>
            <DescriptionText>
                People, states and hospitals all around the world are running very low on essential supplies to stay safe in these difficult times.
                If you, or anyone you know, can quickly produce, source or dropship
              <Text style={styles.bold}> face masks, N95 masks, surgical masks, hand sanitizer, hand soaps, ventilators, thermometers, wet wipes, toilet paper</Text>
                , etc. Please get these items into circulation and into the right hands as soon as possible.
            </DescriptionText>
            <DescriptionText>
                Lives can be saved if we all do our part. The world needs your support to help get essential items into circulation. If you have access to a
              <Text style={styles.bold}> sewing machine, 3D printer</Text>
                , or even a
              <Text style={styles.bold}> distillery</Text>
                , please consider creating items and parts that can be donated and/or sold at a fair price.
            </DescriptionText>
            <DescriptionText>
                Your essential items can be immediately distributed on Haven without fees.
                No account needed. No questions asked. Please do your part to help.
            </DescriptionText>
          </ScrollView>
        </InputGroup>
        <Button
          title="Create Listing"
          wrapperStyle={styles.buttonWrapper}
          onPress={onCreateListing}
          style={styles.firstButton}
        />
      </OBLightModal>
    );
  }
}
