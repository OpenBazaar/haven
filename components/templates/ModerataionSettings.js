import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import InputGroup from '../atoms/InputGroup';
import Button from '../atoms/FullButton';
import DescriptionText from '../atoms/DescriptionText';
import ModerationSettingsEditor from '../organism/ModerationSettingsEditor';

class ModerationSettings extends PureComponent {
  state = {
    showEditor: false,
  };

  render() {
    const { moderationSettings } = this.props;
    const { showEditor } = this.state;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <InputGroup title="Moderators">
          <DescriptionText>
            Moderators on the OpenBazaar network help resolve
            disputes between buyers and vendors, and release funds held in escrow.
            Anyone can become a moderator on the network, but you should only do
            so if you are serious about offering your services to OpenBazaar users.
          </DescriptionText>
          <DescriptionText>
            Moderators need to respond quickly to new disputes,
             communicate with both parties to learn the details of the dispute,
             and then impartially settle the dispute and distribute the escrowed funds.
          </DescriptionText>
        </InputGroup>
        {
          moderationSettings.success === false && showEditor === false ?
            <Button
              title="Become a Moderator"
              onPress={() => {
              this.setState({ showEditor: true });
            }}
            />
          :
            <ModerationSettingsEditor
              moderationSettings={moderationSettings}
              onChange={(settings) => {
              this.props.onChange(settings);
            }}
            />
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  moderationSettings: state.moderationSettings,
});

export default connect(mapStateToProps)(ModerationSettings);
