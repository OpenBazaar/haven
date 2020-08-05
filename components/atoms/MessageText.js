/* eslint no-use-before-define: ["error", { "variables": false }] */
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import decode from 'unescape';

import ParsedText from 'react-native-parsed-text';
import { handleOBDeeplinkWithNavigation } from '../../utils/navigation';
import { getOBParsePatterns } from '../../utils/parseText';

class MessageText extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.currentMessage.text !== nextProps.currentMessage.text;
  }

  onDeeplinkPress = (deeplink) => {
    const { navigation } = this.props;
    handleOBDeeplinkWithNavigation(deeplink, navigation);
  }

  onCrypoLink = coin => (url) => {
    this.props.navigation.navigate('SendMoney', { coin, address: url });
  }

  getParsePatterns = () => {
    const {
      position, linkStyle: propLinkStyle, parsePatterns,
    } = this.props;
    const linkStyle = [
      styles[position].link,
      propLinkStyle[position],
    ];
    return [
      ...parsePatterns(linkStyle),
      ...getOBParsePatterns(linkStyle, this.onDeeplinkPress, this.onCrypoLink),
    ];
  }

  render() {
    const {
      position, containerStyle, textStyle,
      customTextStyle, currentMessage, textProps,
    } = this.props;
    return (
      <View
        style={[
          styles[position].container,
          containerStyle[position],
        ]}
      >
        <ParsedText
          style={[
            styles[position].text,
            textStyle[position],
            customTextStyle,
          ]}
          parse={this.getParsePatterns()}
          childrenProps={{ ...textProps }}
        >
          {decode(currentMessage.text)}
        </ParsedText>
      </View>
    );
  }
}

const textStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};

const styles = {
  left: {
    container: {},
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  },
  right: {
    container: {},
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  },
};

MessageText.contextTypes = {
  actionSheet: PropTypes.func,
};

MessageText.defaultProps = {
  position: 'left',
  currentMessage: {
    text: '',
  },
  containerStyle: {},
  textStyle: {},
  linkStyle: {},
  customTextStyle: {},
  textProps: {},
  parsePatterns: () => [],
};

export default withNavigation(MessageText);
