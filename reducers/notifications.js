import { createAction, handleActions } from 'redux-actions';

export const actions = {
  getCount: 'NOTIFICATIONS/GET_COUNT',
  setCount: 'NOTIFICATIONS/SET_COUNT',
  fetchNotifications: 'NOTIFICATIONS/FETCH',
  fetchLatestNotifications: 'NOTIFICATIONS/FETCH_LATEST',
  setNotifications: 'NOTIFICATIONS/SET',
  appendNotifications: 'NOTIFICATIONS/APPEND',
  prependNotifications: 'NOTIFICATIONS/PREPEND',
  markNotificationAsRead: 'NOTIFIACTIONS/MARK_AS_READ',
  markAllAsRead: 'NOTIFICATIONS/MARK_ALL_AS_READ',
  payment: 'NOTIFICATIONS/PAYMENT',
};

export const getCount = createAction(actions.getCount);
export const fetchNotifications = createAction(actions.fetchNotifications);
export const fetchLatestNotifications = createAction(actions.fetchLatestNotifications);
export const markAllAsRead = createAction(actions.markAllAsRead);
export const simulatePayment = createAction(actions.payment);

const initialState = {
  notifications: [],
  total: 0,
  unread: 0,
  payment: {},
  loading: false,
};

export default handleActions(
  {
    [actions.setNotifications]: (state, action) => ({ ...state, ...action.payload }),
    [actions.fetchNotifications]: state => ({
      ...state,
      loading: false,
    }),
    [actions.fetchLatestNotifications]: state => ({
      ...state,
      loading: true,
    }),
    [actions.prependNotifications]: (state, action) => {
      const total = state.total + action.payload.total;
      const { unread, notifications: newNotes } = action.payload;
      const oldNotes = state.notifications;
      return {
        ...state,
        notifications: [...newNotes, ...oldNotes],
        total,
        unread,
        loading: false,
      };
    },
    [actions.appendNotifications]: (state, action) => {
      const total = state.total + action.payload.total;
      const { unread, notifications: newNotes } = action.payload;
      const oldNotes = state.notifications;
      return {
        ...state,
        notifications: [...oldNotes, ...newNotes],
        total,
        unread,
        loading: false,
      };
    },
    [actions.setCount]: (state, action) => {
      const { unread } = action.payload;
      return {
        ...state,
        unread,
      };
    },
    [actions.markNotificationAsRead]: (state, action) => {
      const notifId = action.payload;
      const notifications = state.notifications.map((val) => {
        if (val.notification.notificationId !== notifId) {
          return { ...val };
        }
        return {
          ...val,
          read: true,
        };
      });
      return {
        ...state,
        notifications,
      };
    },
    [actions.markAllAsRead]: (state) => {
      const notifications = state.notifications.map(val => ({
        ...val,
        read: true,
      }));
      return {
        ...state,
        notifications,
        unread: 0,
      };
    },
    [actions.payment]: (state, action) => ({
      ...state,
      payment: action.payload,
    }),
  },
  initialState,
);
