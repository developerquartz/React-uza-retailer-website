import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../../helpers/apiHelper";
import { PRODUCTS } from "../../helpers/urlHelper";

const getProducts = (url) => async (query, Thunk) => {
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

export const apiGetProducts = createAsyncThunk(
  "apiGetProducts",
  getProducts(PRODUCTS.LIST)
);
export const apiGetTopRankingProducts = createAsyncThunk(
  "apiGetTopRankingProducts",
  getProducts(PRODUCTS.TOP_RANKING)
);
export const apiGetNewArrivalProducts = createAsyncThunk(
  "apiGetNewArrivalProducts",
  getProducts(PRODUCTS.NEW_ARRIVAL)
);
export const apiGetSavingSpotlightProducts = createAsyncThunk(
  "apiGetSavingSpotlightProducts",
  getProducts(PRODUCTS.SAVING_SPOTLIGHT)
);
export const apiGetGuaranteedProducts = createAsyncThunk(
  "apiGetGuaranteedProducts",
  getProducts(PRODUCTS.GUARANTED)
);
export const apiGetBestSalerProducts = createAsyncThunk(
  "apiGetBestSalerProducts",
  getProducts(PRODUCTS.LIST)
);

// Get single product details
export const apiGetProductDetail = createAsyncThunk(
  "apiGetProductDetail",
  async (query, Thunk) => {
    try {
      const res = await apiGet(`${PRODUCTS.DETAIL}/${query.id}`, query);
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
