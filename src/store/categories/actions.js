import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../helpers/apiHelper";
import { CATEGORIES } from "../../helpers/urlHelper";

const getCategories = (url) => async (query, Thunk) => {
  try {
    const res = await apiGet(url, query);
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
};

export const apiGetCategories = createAsyncThunk(
  "apiGetCategories",
  getCategories(CATEGORIES.LIST)
);
export const apiGetTopCategories = createAsyncThunk(
  "apiGetTopCategories",
  getCategories(CATEGORIES.TOP_CATEGORIES)
);
export const apiGetSourceByApplication = createAsyncThunk(
  "apiGetSourceByApplication",
  getCategories(CATEGORIES.SOURCE_APPLICATION)
);
