import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut } from "../../helpers/apiHelper";
import { AUTH, FORGOT_PASSWORD, PROFILE } from "../../helpers/urlHelper";
import { toast } from "react-toastify";

export const apiVerifyEmail = createAsyncThunk(
  "apiVerifyEmail",
  async ({ data, callback }, Thunk) => {
    const res = await apiPost(AUTH.VERIFY_EMAIL, data);
    callback(res);
    return res.data;
  }
);

export const apiVerifyMobile = createAsyncThunk(
  "apiVerifyMobile",
  async ({ data, callback }, Thunk) => {
    const res = await apiPost(AUTH.VERIFY_MOBILE, data);
    callback(res);
    return res.data;
  }
);

export const apiVerifyOtp = createAsyncThunk(
  "apiVerifyOtp",
  async ({ data, callback }, Thunk) => {
    const res = await apiPost(AUTH.VERIFY_OTP, data);
    callback(res);
    return res.data;
  }
);

export const apiRegister = createAsyncThunk(
  "apiRegister",
  async ({ data, callback }, Thunk) => {
    try {
      const res = await apiPost(AUTH.REGISTER, data);
      if (res.status === "success") {
        callback(res);
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return Thunk.rejectWithValue(
        error.message || "Something went wrong, please try again later."
      );
    }
  }
);

export const apiLogin = createAsyncThunk(
  "apiLogin",
  async ({ data, callback }, Thunk) => {
    try {
      const res = await apiPost(AUTH.LOGIN, data);
      callback(res);
      if (res.status === "success") {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return Thunk.rejectWithValue(
        error.message || "Something went wrong, please try again later."
      );
    }
  }
);

export const apiLogout = createAsyncThunk("apiLogout", async (body, Thunk) => {
  try {
    const res = await apiPost(AUTH.LOGOUT, body);
    if (res.status === "success") {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    return Thunk.rejectWithValue(
      error.message || "Something went wrong, please try again later."
    );
  }
});

export const apiGetProfile = createAsyncThunk(
  "apiGetProfile",
  async (body, Thunk) => {
    try {
      const res = await apiGet(PROFILE.GET);
      if (res.status === "success") {
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return Thunk.rejectWithValue(
        error.message || "Something went wrong, please try again later."
      );
    }
  }
);

export const apiUpdateProfile = createAsyncThunk(
  "apiUpdateProfile",
  async ({ data, callback = () => {} }, Thunk) => {
    try {
      const res = await apiPut(PROFILE.UPDATE, data);
      if (res.status === "success") {
        toast.success(res.message);
        callback(res);
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return Thunk.rejectWithValue(
        error.message || "Something went wrong, please try again later."
      );
    }
  }
);

export const apiChangePassword = createAsyncThunk(
  "apiChangePassword",
  async ({ callback, body }, Thunk) => {
    try {
      const res = await apiPut(PROFILE.CHANGE_PASSWORD, body);
      if (res.status === "success") {
        callback(res);
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return Thunk.rejectWithValue(
        error.message || "Something went wrong, please try again later."
      );
    }
  }
);

// Forgot password
export const apiForgotPassword = createAsyncThunk(
  "apiForgotPassword",
  async ({ callback, data }, Thunk) => {
    try {
      const res = await apiPost(FORGOT_PASSWORD.SEND_OTP, data);
      if (res.status === "success") {
        callback(res);
        return data;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return Thunk.rejectWithValue(
        error.message || "Something went wrong, please try again later."
      );
    }
  }
);

// Forgot password
export const apiResetPassword = createAsyncThunk(
  "apiResetPassword",
  async ({ callback, data }, Thunk) => {
    try {
      const res = await apiPost(FORGOT_PASSWORD.RESET, data);
      if (res.status === "success") {
        callback(res);
        return res;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return Thunk.rejectWithValue(
        error.message || "Something went wrong, please try again later."
      );
    }
  }
);
