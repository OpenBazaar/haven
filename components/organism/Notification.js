import React from 'react';

import SocialNotification from '../molecules/SocialNotification';
import OrderNotification from '../molecules/OrderNotification';

import { getNotificationType, SOCIAL_TYPES } from '../../utils/notification';

export default class Notification extends React.PureComponent {
  render() {
    const { notification } = this.props;
    const { type, verb } = notification;
    const ntfType = getNotificationType(type);
    if (SOCIAL_TYPES.includes(verb)) {
      return <SocialNotification notification={notification} />;
    } else if (ntfType === 'order') {
      return <OrderNotification notification={notification} category="order" />;
    } else if (ntfType === 'dispute') {
      return <OrderNotification notification={notification} category="dispute" />;
    }
    return false;
  }
}
