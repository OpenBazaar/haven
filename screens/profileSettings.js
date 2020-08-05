import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, findNodeHandle, Alert, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as _ from 'lodash';

import { fetchProfile, updateProfile } from '../reducers/profile';
import { screenWrapper } from '../utils/styles';

import ProfileImages from '../components/organism/ProfileImages';
import InputGroup from '../components/atoms/InputGroup';
import TextInput from '../components/atoms/TextInput';
import TextArea from '../components/atoms/TextArea';
import EditProfileBanner from '../components/atoms/EditProfileBanner';
import EditProfileHeader from '../components/molecules/EditProfileHeader';
import { StatusBarSpacer } from '../status-bar';
import { eventTracker } from '../utils/EventTracker';

class ProfileSettings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...props.profile, keyboardVisible: false };
  }

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.profile, this.props.profile)) {
      this.setState({ ...prevProps.profile })
    }
  }

  onLeft = () => {
    Alert.alert('Warning', 'If you go back, you will lose your progress', [
      { text: 'Cancel' },
      { text: 'OK', onPress: () => { this.props.navigation.goBack(); } },
      { cancelable: false },
    ]);
  };

  onSuccess = () => {
    this.props.navigation.goBack();
  };

  keyboardDidShow = () => {
    this.setState({ keyboardVisible: true });
  };

  keyboardWillHide = () => {
    this.setState({ keyboardVisible: false });
  };

  findPosition = (event) => {
    this.scrollToInput(findNodeHandle(event.target));
  };

  handleChange = key => (value) => {
    if (key === 'imageHashes') {
      this.setState({ ...value });
    } else {
      this.setState({ [key]: value });
    }
  };

  handleContactChange = key => (value) => {
    const { contactInfo } = this.state;
    const newContactInfo = { ...contactInfo };
    newContactInfo[key] = value;
    this.setState({ contactInfo: newContactInfo });
  };

  handleSave = () => {
    const { keyboardVisible, ...profile } = this.state;
    eventTracker.trackEvent('EditProfile-UpdatedProfileInfo');
    this.props.updateProfile({ data: profile, onSuccess: this.onSuccess });
  };

  scrollToInput(reactNode) {
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  render() {
    const {
      name,
      shortDescription,
      location,
      contactInfo = {},
      about,
      avatarHashes,
      headerHashes,
      keyboardVisible,
    } = this.state;
    const { email = '', phoneNumber = '', website = '' } = contactInfo;
    return (
      <View style={screenWrapper.wrapper}>
        <EditProfileHeader onBack={this.onLeft} />
        <StatusBarSpacer />
        <KeyboardAwareScrollView
          innerRef={(ref) => {
            this.scroll = ref;
          }}
        >
          <ProfileImages
            avatarHashes={avatarHashes}
            headerHashes={headerHashes}
            onChange={this.handleChange('imageHashes')}
          />
          <View style={screenWrapper.wrapper}>
            <InputGroup title="Profile Information" noHeaderTopPadding>
              <TextInput
                title="Name"
                required
                value={name}
                onChangeText={this.handleChange('name')}
                onFocus={this.findPosition}
                placeholder="Satoshi Nakamoto"
                maxLength={40}
              />
              <TextInput
                title="Bio"
                value={shortDescription}
                onChangeText={this.handleChange('shortDescription')}
                onFocus={this.findPosition}
                placeholder="Write a short description"
                maxLength={140}
              />
              <TextInput
                noBorder
                title="Location"
                value={location}
                onChangeText={this.handleChange('location')}
                onFocus={this.findPosition}
                placeholder="e.g. Seattle"
              />
            </InputGroup>
            <InputGroup title="Contact">
              <TextInput
                title="Email"
                value={email}
                onChangeText={this.handleContactChange('email')}
                onFocus={this.findPosition}
                placeholder="satoshin@gmx.com"
                keyboardType="email-address"
              />
              <TextInput
                title="Phone Number"
                value={phoneNumber}
                onChangeText={this.handleContactChange('phoneNumber')}
                onFocus={this.findPosition}
                placeholder="+123456789"
                keyboardType="phone-pad"
              />
              <TextInput
                noBorder
                title="Website"
                value={website}
                onChangeText={this.handleContactChange('website')}
                onFocus={this.findPosition}
                placeholder="hello.com"
              />
            </InputGroup>
            <InputGroup title="About">
              <TextArea
                noBorder
                value={about}
                onChangeText={this.handleChange('about')}
                onFocus={this.findPosition}
                placeholder="Share more about yourself here"
              />
            </InputGroup>
          </View>
          {keyboardVisible && <EditProfileBanner onSave={this.handleSave} />}
        </KeyboardAwareScrollView>
        {!keyboardVisible && <EditProfileBanner onSave={this.handleSave} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({ profile: _.get(state, 'profile.data') });

const mapDispatchToProps = {
  fetchProfile,
  updateProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettings);
