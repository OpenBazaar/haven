import { all } from 'redux-saga/effects';

import ProductSaga from './product';
import SearchSaga from './search';
import AppstateSaga from './appstate';
import ProfileSaga from './profile';
import ModeratorsSaga from './moderators';
import FollowSaga from './follow';
import CreateListingSaga from './createListing';
import NotificationsSaga from './notification';
import SettingsSaga from './settings';
import ModerationSettingsSaga from './moderationSettings';
import ExchangeRateSaga from './exchangeRate';
import SocketSaga from './socket';
import WalletSaga from './wallet';
import ChatSaga from './chat';
import OrderSaga from './order';
import FeedSaga from './feed';
import StreamSaga from './stream';
import ListingsSaga from './listings';
import FeaturedSaga from './featured';
import PromoSaga from './promo';
import StoreListingsSaga from './storeListings';
import ConfigurationSaga from './config';
import RatingsSaga from './ratings';

export default function* mainSaga() {
  yield all([
    SocketSaga(),
    ProductSaga(),
    SearchSaga(),
    AppstateSaga(),
    ProfileSaga(),
    ModeratorsSaga(),
    FollowSaga(),
    CreateListingSaga(),
    NotificationsSaga(),
    SettingsSaga(),
    ModerationSettingsSaga(),
    ChatSaga(),
    OrderSaga(),
    FeedSaga(),
    ExchangeRateSaga(),
    WalletSaga(),
    ListingsSaga(),
    FeaturedSaga(),
    PromoSaga(),
    StoreListingsSaga(),
    ConfigurationSaga(),
    RatingsSaga(),
    StreamSaga(),
  ]);
}
