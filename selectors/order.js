import { createSelector } from 'reselect';

const purchasesSelector = state => state.orders.purchases;
const salesSelector = state => state.orders.sales;

const ordersSelector = createSelector(
  purchasesSelector,
  salesSelector,
  (purchases, sales) => {
    return [...purchases, ...sales];
  },
);

const orderSelector = createSelector(
  ordersSelector,
  orders => (orderId) => {
    const order = orders.find(o => o.orderId === orderId);
    return order || {};
  },
);

const peerIDSelector = createSelector(
  orderSelector,
  getOrderBrief => (orderId, orderType) => {
    const order = getOrderBrief(orderId);
    const { vendorId, buyerId } = order;
    return orderType === 'purchases' ? vendorId : buyerId;
  },
);

export const ordersMap = state => ({
  getOrderBrief: orderSelector(state),
  getPeerIDFromOrder: peerIDSelector(state),
});
