import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchPurchases: 'ORDER/FETCH_PURCHASES',
  setPurchases: 'ORDER/SET_PURCHASES',
  fetchSales: 'ORDER/FETCH_SALES',
  setSales: 'ORDER/SET_SALES',
  updatePurchase: 'ORDER/UPDATE_PURCHASE',
  updateSale: 'ORDER/UPDATE_SALES',
  updateOrderWithDetails: 'ORDER/UPDATE_ORDER_WITH_DETAILS',
  fetchOrder: 'ORDER/FETCH_ORDER',
  clearOrder: 'ORDER/CLEAR_ORDER',
  setOrder: 'ORDER/SET_ORDER',
  cancelOrder: 'ORDER/CANCEL',
  fundOrder: 'ORDER/FUND',
  confirmOrder: 'ORDER/CONFIRM',
  refundOrder: 'ORDER/REFUND',
  fulfillOrder: 'ORDER/FULFILL',
  completeOrder: 'ORDER/COMPLETE',
  openDispute: 'ORDER/OPEN_DISPUTE',
  acceptPayout: 'ORDER/ACCEPT_PAYOUT',
  claimPayment: 'ORDER/CLAIM_PAYMENT',
  actionStart: 'ORDER/PROCESSING',
  actionFinished: 'ORDER/FINISHED',
  purchaseListing: 'ORDER/PURCHASE',
  scanOfflineMessages: 'ORDER/SCAN_OFFLINE_MESSAGE',
  resendOrderMessage: 'ORDER/RESEND_ORDER_MESSAGE',
  setPollForSessionExecuted: 'ORDER/SET_POLL_FOR_SESSION_EXECUTED',
};

export const fetchPurchases = createAction(actions.fetchPurchases);
export const setPurchases = createAction(actions.setPurchases);
export const fetchSales = createAction(actions.fetchSales);
export const setSales = createAction(actions.setSales);
export const fetchOrder = createAction(actions.fetchOrder);
export const clearOrder = createAction(actions.clearOrder);
export const cancelOrder = createAction(actions.cancelOrder);
export const fundOrder = createAction(actions.fundOrder);
export const confirmOrder = createAction(actions.confirmOrder);
export const refundOrder = createAction(actions.refundOrder);
export const fulfillOrder = createAction(actions.fulfillOrder);
export const completeOrder = createAction(actions.completeOrder);
export const openDispute = createAction(actions.openDispute);
export const acceptPayout = createAction(actions.acceptPayout);
export const claimPayment = createAction(actions.claimPayment);
export const actionStart = createAction(actions.actionStart);
export const updatePurchase = createAction(actions.updatePurchase);
export const updateSale = createAction(actions.updateSale);
export const purchaseListing = createAction(actions.purchaseListing);
export const scanOfflineMessages = createAction(actions.scanOfflineMessages);
export const resendOrderMessage = createAction(actions.resendOrderMessage);


const initialState = {
  purchases: [],
  sales: [],
  pollForSessionExecuted: false,
  polls: {},
  processing: false,
  orderDetails: {},
  fetching: false,
};

export default handleActions({
  [actions.setPurchases]: (state, action) => ({ ...state, purchases: action.payload }),
  [actions.setSales]: (state, action) => ({ ...state, sales: action.payload }),
  [actions.updateSale]: (state, action) => {
    const { orderId, body } = action.payload;
    return {
      ...state,
      sales: state.sales.map(sale => (sale.orderId === orderId ? { ...sale, ...body } : sale)),
    };
  },
  [actions.updatePurchase]: (state, action) => {
    const { orderId, body } = action.payload;
    return {
      ...state,
      purchases: state.purchases.map(purchase => (purchase.orderId === orderId ? { ...purchase, ...body } : purchase)),
    };
  },
  [actions.fetchOrder]: state => ({ ...state, fetching: true }),
  [actions.setOrder]: (state, action) => ({ ...state, orderDetails: action.payload, fetching: false }),
  [actions.clearOrder]: state => ({ ...state, orderDetails: {}, fetching: false }),
  [actions.actionStart]: state => ({ ...state, processing: true }),
  [actions.actionFinished]: state => ({ ...state, processing: false }),
  [actions.setPollForSessionExecuted]: state => ({ ...state, pollForSessionExecuted: true }),
  [actions.resendOrderMessage]: (state, action) => {
    const { orderId, messageType } = action.payload;
    const currentPoll = state.polls[orderId] || {};
    const shouldIncreaseCount = !currentPoll.messageType || currentPoll.messageType === messageType;

    return {
      ...state,
      polls: {
        ...state.polls,
        [orderId]: {
          count: shouldIncreaseCount ? (currentPoll.count || 0) + 1 : 0,
          messageType,
        },
      },
    };
  },
}, initialState);
