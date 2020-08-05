import React from 'react';
import { Platform } from 'react-native';
import ActionSheet, { ActionSheetCustom } from 'react-native-actionsheet';

import { actionSheetStyles } from '../../utils/styles';

class OBActionSheet extends React.Component {
  setActionSheet = (component) => {
    this.actionSheet = component;
  };

  show() {
    this.actionSheet.show();
  }

  render() {
    const ActionSheetComponent = Platform.OS === 'ios' ? ActionSheet : ActionSheetCustom;
    return (
      <ActionSheetComponent
        ref={this.setActionSheet}
        styles={actionSheetStyles}
        {...this.props}
      />
    );
  }
}

export default OBActionSheet;
