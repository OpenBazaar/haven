import React from 'react';
import FastImage from 'react-native-fast-image';
import { get } from 'lodash';

import { getImageSourceWithFallback } from '../../utils/files';

export default class OBFastImage extends React.Component {
  state = { tryStatus: 'first' }

  onLoadFailed = () => {
    const { tryStatus } = this.state;
    switch (tryStatus) {
      case 'first':
        this.setState({ tryStatus: 'second' });
        break;
      case 'second':
        this.setState({ tryStatus: 'third' });
        break;
      default:
        break;
    }
  }

  render() {
    const { hash, ...rest } = this.props;
    const imageSource = getImageSourceWithFallback(hash);
    const { tryStatus } = this.state;
    return (
      <FastImage
        source={get(imageSource, tryStatus)}
        {...rest}
        onError={this.onLoadFailed}
      />
    );
  }
}
