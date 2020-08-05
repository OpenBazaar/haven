import React from 'react';
import deepEqual from 'deep-equal';

import InputGroup from '../atoms/InputGroup';
import TagInput from '../atoms/TagInput';
import TextInput from '../atoms/TextInput';
import TextArea from '../atoms/TextArea';

export default class SingleVariantEditor extends React.Component {
  static getDerivedStateFromProps(props) {
    if (!deepEqual(this.state, props.option)) {
      return { ...props.option };
    } else return {};
  }

  state = {
    name: '',
    description: '',
    variants: [],
  }

  onChangeTitle = (name) => {
    const { index } = this.props;
    this.setState({ name });
    this.props.onChange(index, { ...this.state, name });
  }

  onChangeDescription = (description) => {
    const { index } = this.props;
    this.setState({ description });
    this.props.onChange(index, { ...this.state, description });
  }

  onChangeTags = (variants) => {
    const { index } = this.props;
    this.setState({ variants });
    this.props.onChange(index, { ...this.state, variants });
  }

  removeOption = () => {
    const { index, removeOption } = this.props;
    this.setState({
      name: '',
      description: '',
      variants: [],
    });
    removeOption(index);
  }

  render() {
    const { name, description, variants } = this.state;
    const { index } = this.props;
    return (
      <InputGroup
        title={`Variant ${index + 1}`}
        actionTitle="Delete"
        actionType="secondary"
        action={this.removeOption}
      >
        <React.Fragment>
          <TextInput
            title="Title"
            value={name}
            required
            onChangeText={this.onChangeTitle}
            placeholder="e.g. Size"
            onFocus={this.props.focusInput}
          />
          <TextArea
            title="Description"
            value={description}
            onChangeText={this.onChangeDescription}
            placeholder="e.g. Size of Product"
            onFocus={this.props.focusInput}
          />
          <TagInput
            title="Choices"
            required
            noBorder
            initialTags={variants}
            placeholder="e.g. Small, Medium, Large"
            onChangeTags={this.onChangeTags}
            onFocus={this.props.focusInput}
          />
        </React.Fragment>
      </InputGroup>
    );
  }
}
