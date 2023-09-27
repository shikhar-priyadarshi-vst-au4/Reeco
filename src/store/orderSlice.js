import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/orders';

const initialState = {
  orderId: null,
  orderIndex: null,
  orderIndexStatus: false,
  orderDetails: [],
  orderItems: [],
  showOrderModal: false,
};

const orderSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    setOrderItems: (state, { payload }) => {
      state.orderItems = payload;
    },
    setOrderDetails: (state, { payload }) => {
      state.orderDetails = payload;
    },
    setOrderModal: (state, {payload}) => {
      state.showOrderModal = payload;
    },
    setOrderIndex: (state, {payload}) => {
      state.orderIndex = payload.index;
      state.orderIndexStatus = payload.status;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getOrders.matchFulfilled,
        (state, {payload}) => {
          if(payload){
            state.orderId = payload?.orderId;
            state.orderDetails = payload?.orderShortDetails;
            state.orderItems = payload?.orderList;
          }
        })
  }
});

export const { setOrderItems, setOrderDetails, setOrderModal, setOrderIndex } = orderSlice.actions;
export default orderSlice.reducer;
