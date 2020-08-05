import React from 'react';
import { Text } from 'react-native';

import InputGroup from '../atoms/InputGroup';
import OptionGroup from '../atoms/OptionGroup';
import FormLabelText from '../atoms/FormLabelText';
import { primaryTextColor } from '../commonColors';

const style = {
  fontSize: 15,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0,
  textAlign: 'left',
  color: primaryTextColor,
  paddingVertical: 20,
};

export default class TagEditor extends React.PureComponent {
  render() {
    const { count } = this.props;
    return (
      <InputGroup title="Tags" showPencil onPress={this.props.onPress}>
        <OptionGroup noBorder noArrow>
          { count > 0 ?
            <Text style={style}>{`${count} tag${count > 1 ? 's' : ''}`}</Text>
          :
            <FormLabelText text="Add #tags to get your listing discovered" />
          }
        </OptionGroup>
      </InputGroup>
    );
  }
}
