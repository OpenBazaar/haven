import React from 'react';
import {
  createAppContainer, createBottomTabNavigator, createStackNavigator, NavigationActions, StackActions,
} from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import Feather from 'react-native-vector-icons/Feather';

import ShopScreen from './screens/shop';
import SearchResult from './screens/searchResult';
import SearchFilter from './screens/searchFilter';
import Listing from './screens/listing';
import StoreScreen from './screens/store';
import ChatsScreen from './screens/chats';
import FeedScreen from './screens/feed';
import NewFeed from './screens/new-feed';
import NewChat from './screens/new-chat';
import ChatDetail from './screens/chatDetail';
import ExternalStoreScreen from './screens/externalStore';
import StoreRatingsScreen from './screens/StoreRatings';
import ProductRatingsScreen from './screens/ProductRatings';

import CreateListing from './screens/createListing';
import EditListing from './screens/editListing';
import AddListingCoupon from './screens/addListingCoupon';
import ListingAdvancedOptions from './screens/listingAdvancedOptions';
import TagEditor from './screens/tagEditor';
import CustomOptions from './screens/customOptions';
import EditInventory from './screens/editInventory';
import ShippingOptions from './screens/shippingOptions';
import AddShippingMethod from './screens/addShippingMethod';
import ListingAdvancedDetails from './screens/listingAdvancedDetails';
import Settings from './screens/settings';
import Analytics from './screens/analytics';
import ProfileSettings from './screens/profileSettings';
import Notifications from './screens/notifications';
import Policies from './screens/policies';
import ShippingAddress from './screens/shippingAddress';
import EditShippingAddress from './screens/editShippingAddress';
import ModerationSettings from './screens/moderationSettings';
import BlockedNodes from './screens/blocked-nodes';
import ServerLog from './screens/serverLog';
import Wallet from './screens/wallet';
import Transactions from './screens/transactions';
import CryptoBalance from './screens/cryptoBalance';
import SendMoney from './screens/sendMoney';
import ReceiveMoney from './screens/receiveMoney';
import PaymentSuccess from './screens/paymentSuccess';
import CheckoutOption from './screens/checkoutOption';
import CheckoutListing from './screens/checkout';
import PaymentMethod from './screens/paymentMethod';
import CheckoutModerators from './screens/checkoutModerators';
import PurchaseState from './screens/purchaseState';
import ExternalPay from './screens/externalPay';
import ExternalPaySuccess from './screens/externalPaySuccess';
import Orders from './screens/order';
import OrderDetails from './screens/orderDetails';
import WishList from './screens/wishlist';
import Categories from './screens/categories';
import SubCategories from './screens/subCategories';
import CategoryOverview from './screens/categoryOverview';
import CategoryResult from './screens/categoryResult';
import QueryResult from './screens/queryResult';
import Followings from './screens/followings';
import Followers from './screens/followers';
import StoreModerators from './screens/storeModerators';
import AddModerators from './screens/addModerators';
import ModeratorDetails from './screens/moderatorDetails';
import FeedDetail from './screens/feedDetail';
import Me from './screens/Me';
import EditVariants from './screens/editVariants';
import Onboarding from './screens/onboarding';
import Privacy from './screens/privacy';
import NotificationSettings from './screens/notificationSettings';

import ChatNavIcon from './components/atoms/ChatNavIcon';
import ProfilePicture from './components/atoms/ProfilePicture';
import PlusButton from './components/atoms/PlusButton';
import Resync from './screens/Resync';
import AcceptedCoins from './screens/acceptedCoins';

import BackupProfileInit from './screens/backupProfileInit';
import BackupProfilePassword from './screens/backupProfilePassword';
import BackupProfileUpload from './screens/backupProfileUpload';
import RestoreProfileInit from './screens/restoreProfileInit';
import RestoreProfilePassword from './screens/restoreProfilePassword';
import Hashtag from './screens/hashtag';

import { eventTracker } from './utils/EventTracker';

const ShopTab = createStackNavigator(
  {
    ShopScreen: { screen: ShopScreen },
  },
  {
    headerMode: 'none',
  },
);

const ChatsTab = createStackNavigator(
  {
    ChatsScreen: { screen: ChatsScreen },
  },
  {
    headerMode: 'none',
  },
);

const FeedTab = createStackNavigator(
  {
    FeedScreen: { screen: FeedScreen },
  },
  {
    headerMode: 'none',
  },
);

const MeTab = createStackNavigator(
  {
    WalletMain: { screen: Me },
    Store: { screen: StoreScreen },
  },
  {
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: sceneProps => StackViewStyleInterpolator.forHorizontal(sceneProps),
    }),
  },
);

let currentIndex;

const MainTab = createBottomTabNavigator(
  {
    Shop: {
      screen: ShopTab,
      navigationOptions: {
        tabBarOnPress: ({ defaultHandler }) => {
          eventTracker.trackEvent('MainNavigationTap-Discover');
          defaultHandler();
        },
        tabBarIcon: ({ focused }) => (
          <Feather name="shopping-cart" size={23} color={focused ? '#00bf65' : '#969696'} />
        ),
      },
    },
    Feed: {
      screen: FeedTab,
      navigationOptions: {
        tabBarOnPress: ({ defaultHandler }) => {
          eventTracker.trackEvent('MainNavigationTap-Social');
          defaultHandler();
        },
        tabBarIcon: ({ focused }) => (
          <Feather name="users" size={23} color={focused ? '#00bf65' : '#969696'} />
        ),
      },
    },
    Plus: {
      screen: () => null,
      navigationOptions: {
        tabBarOnPress: ({ defaultHandler }) => {
          eventTracker.trackEvent('MainNavigationTap-Create');
          defaultHandler();
        },
        tabBarIcon: () => <PlusButton />,
      },
    },
    Chat: {
      screen: ChatsTab,
      navigationOptions: {
        tabBarOnPress: ({ defaultHandler }) => {
          eventTracker.trackEvent('MainNavigationTap-Chat');
          defaultHandler();
        },
        tabBarIcon: ({ focused }) => <ChatNavIcon focused={focused} />,
      },
    },
    Me: {
      screen: MeTab,
      navigationOptions: {
        tabBarOnPress: ({ defaultHandler }) => {
          eventTracker.trackEvent('MainNavigationTap-Me');
          defaultHandler();
        },
        tabBarIcon: ({ focused }) => <ProfilePicture focused={focused} />,
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: false,
    tabBarComponent: props => (
      <BottomTabBar
        {...props}
        onTabPress={(tabInfo) => {
        if (tabInfo.route.routeName === 'Me') {
          const resetTabAction = NavigationActions.navigate({
            routeName: 'Me',
            action: StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'WalletMain' })],
            }),
          });
          props.navigation.dispatch(resetTabAction);
        } else {
          props.onTabPress(tabInfo);
        }
      }}
      />
    ),
    animationEnabled: false,
    removeClippedSubviews: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#000000',
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
);

const SettingsStack = createStackNavigator(
  {
    MainSettings: { screen: Settings },
    ProfileSettings: { screen: ProfileSettings },
    Notifications: { screen: Notifications },
    Policies: { screen: Policies },
    ShippingAddress: { screen: ShippingAddress },
    ModerationSettings: { screen: ModerationSettings },
    StoreModerators: { screen: StoreModerators },
    AddModerators: { screen: AddModerators },
    ModeratorDetails: { screen: ModeratorDetails },
    BlockedNodes: { screen: BlockedNodes },
    Analytics: { screen: Analytics },
    Resync: { screen: Resync },
    AcceptedCoins: { screen: AcceptedCoins },
    ServerLog: { screen: ServerLog },
    NotificationSettings: { screen: NotificationSettings },
    BackupProfileInit: { screen: BackupProfileInit },
    BackupProfilePassword: { screen: BackupProfilePassword },
    BackupProfileUpload: { screen: BackupProfileUpload },
    RestoreProfileInit: { screen: RestoreProfileInit },
    RestoreProfilePassword: { screen: RestoreProfilePassword },
  },
  {
    headerMode: 'none',
    cardStyle: {
      shadowColor: 'transparent',
    },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => StackViewStyleInterpolator.forHorizontal(sceneProps),
    }),
  },
);

const AppNavigator = createStackNavigator(
  {
    MainNav: { screen: MainTab },

    Listing: { screen: Listing },

    ShippingOptions: { screen: ShippingOptions },
    AddShippingMethod: { screen: AddShippingMethod },
    ExternalStore: { screen: ExternalStoreScreen },
    MyStore: { screen: StoreScreen },
    ExternalFollowings: { screen: Followings },
    ExternalFollowers: { screen: Followers },
    Feed: { screen: FeedScreen },
    FeedDetail: { screen: FeedDetail },
    StoreRatings: { screen: StoreRatingsScreen },
    ProductRatings: { screen: ProductRatingsScreen },

    CreateListing: { screen: CreateListing },
    EditListing: { screen: EditListing },
    AddListingCoupon: { screen: AddListingCoupon },
    TagEditor: { screen: TagEditor },
    ListingAdvancedOptions: { screen: ListingAdvancedOptions },
    AdvancedDetails: { screen: ListingAdvancedDetails },
    CustomOptions: { screen: CustomOptions },
    EditVariants: { screen: EditVariants },
    EditInventory: { screen: EditInventory },

    Settings: { screen: SettingsStack },

    ChatDetail: { screen: ChatDetail },
    NewChat: { screen: NewChat },

    NewFeed: { screen: NewFeed },

    SearchResult: { screen: SearchResult },
    SearchFilter: { screen: SearchFilter },

    WishList: { screen: WishList },

    Wallet: { screen: Wallet },
    Transactions: { screen: Transactions },
    CryptoBalance: { screen: CryptoBalance },
    SendMoney: { screen: SendMoney },
    ReceiveMoney: { screen: ReceiveMoney },
    PaymentSuccess: { screen: PaymentSuccess },

    Orders: { screen: Orders, header: null },
    OrderDetails: { screen: OrderDetails, header: null },
    ModeratorDetails: { screen: ModeratorDetails },

    Categories: { screen: Categories },
    CategoryOverview: { screen: CategoryOverview },
    CategoryResult: { screen: CategoryResult },
    QueryResult: { screen: QueryResult },
    SubCategories: { screen: SubCategories },

    ProfileSettings: { screen: ProfileSettings },

    Followings: { screen: Followings },
    Followers: { screen: Followers },

    Notifications: { screen: Notifications },

    EditShippingAddress: { screen: EditShippingAddress },

    // Checkout flow
    CheckoutOption: { screen: CheckoutOption },
    CheckoutListing: { screen: CheckoutListing },
    CheckoutShippingAddress: { screen: ShippingAddress },
    CheckoutReceiveMoney: { screen: ReceiveMoney },
    PaymentMethod: { screen: PaymentMethod },
    CheckoutModerators: { screen: CheckoutModerators },
    CheckoutModeratorDetails: { screen: ModeratorDetails },
    PurchaseState: { screen: PurchaseState },
    ExternalPay: { screen: ExternalPay },
    ExternalPaySuccess: { screen: ExternalPaySuccess },
    Hashtag: { screen: Hashtag },
  },
  {
    cardStyle: {
      shadowColor: 'transparent',
    },
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: (sceneProps) => {
        const { routeName, params } = sceneProps.scene.route;
        if (routeName === 'SearchResult') {
          return null;
        } else if (routeName === 'CategoryResult' && params.searchAutoFocus) {
          return null;
        } else {
          return StackViewStyleInterpolator.forHorizontal(sceneProps);
        }
      },
    }),
  },
);

export const OnboardingNavigator = createStackNavigator(
  {
    Onboarding: { screen: Onboarding },
    RestoreProfileInit: { screen: RestoreProfileInit },
    RestoreProfilePassword: { screen: RestoreProfilePassword },
    Privacy: { screen: Privacy },
  },
  {
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: sceneProps => StackViewStyleInterpolator.forHorizontal(sceneProps),
    }),
  },
);

export const OnboardingContainer = createAppContainer(OnboardingNavigator);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
