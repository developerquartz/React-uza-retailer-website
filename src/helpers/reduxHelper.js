import { updateAuthInfo } from "./authHelper";

export const paginationInitialState = {
  isLoading: false,
  items: [],
  total: 0,
  skip: 0,
  limit: 10,
  totalPages: 0,
};

export const paginateFulfilled = (field) => (state, action) => {
  state[field].isLoading = false;
  state[field].items = action.payload.items;
  state[field].total = action.payload.total;
  state[field].skip = action.payload.skip;
  state[field].limit = action.payload.limit;
  state[field].totalPages = action.payload.totalPages;
};

export const paginatePending = (field) => (state, action) => {
  state[field].isLoading = true;
};

export const paginateRejected = (field) => (state, action) => {
  state[field].isLoading = false;
};

export const loginSuccess = (state, action) => {
  state.message = "";
  state.isLoading = false;
  state.user = action.payload.user;
  state.authToken = action.payload.token;
  state.isLogin = true;
  updateAuthInfo(state.authToken, state.user);
};

export const pendingState = (state, action) => {
  state.isLoading = true;
  state.message = "";
}

export const failedState = (state, action) => {
  state.isLoading = false;
  state.message = action.payload;
}