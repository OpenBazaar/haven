import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

export default class PlaceholderStyleTextInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { placeholder: props.value.length === 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.setState({ placeholder: ev.nativeEvent.text.length === 0 });
    const { onChange } = this.props;
    if (onChange) {
      onChange(ev);
    }
  }

  render() {
    const {
      placeholderStyle, style, onChange, inputRef, ...rest
    } = this.props;

    return (<TextInput
      ref={inputRef}
      {...rest}
      onChange={this.handleChange}
      style={this.state.placeholder ? [style, placeholderStyle] : style}
    />);
  }
}
