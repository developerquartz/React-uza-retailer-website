import { createSlice } from '@reduxjs/toolkit'
import { apiGetBestSalerProducts, apiGetGuaranteedProducts, apiGetNewArrivalProducts, apiGetProductDetail, apiGetProducts, apiGetSavingSpotlightProducts, apiGetTopRankingProducts } from './actions'
import { paginateFulfilled, paginatePending, paginateRejected, paginationInitialState } from '../../helpers/reduxHelper';

const initialState = {
    products: paginationInitialState,
    topRankingProducts: paginationInitialState,
    newArrivalProducts: paginationInitialState,
    savingSpotlightProducts: paginationInitialState,
    guaranteedProducts: paginationInitialState,
    bestSalerProducts: paginationInitialState,
    productDetail: {
        isLoading: false,
        detail: null,
    },
}

export const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        manageProductForCart: (state, action) => {
            state.productDetail.detail = action.payload;
        },
        setAddedInCart: (state, action) => {
            if(action.payload.variation_id) {
                state.productDetail.detail = { ...state.productDetail.detail, variations: state.productDetail.detail.variations.map((variation) => variation._id === action.payload.variation_id ? { ...variation, addedInCart: true } : variation) }
            }
            else{
                state.productDetail.detail.addedInCart = true;
            }
        }
    },
    extraReducers: (builder) => {
        // Get products
        builder
            .addCase(apiGetProducts.fulfilled, paginateFulfilled('products'))
            .addCase(apiGetProducts.pending, paginatePending('products'))
            .addCase(apiGetProducts.rejected, paginateRejected('products'));


        // Top ranking products
        builder
            .addCase(apiGetTopRankingProducts.fulfilled, paginateFulfilled('topRankingProducts'))
            .addCase(apiGetTopRankingProducts.pending, paginatePending('topRankingProducts'))
            .addCase(apiGetTopRankingProducts.rejected, paginateRejected('topRankingProducts'));


        // Get new arrival products
        builder
            .addCase(apiGetNewArrivalProducts.fulfilled, paginateFulfilled('newArrivalProducts'))
            .addCase(apiGetNewArrivalProducts.pending, paginatePending('newArrivalProducts'))
            .addCase(apiGetNewArrivalProducts.rejected, paginateRejected('newArrivalProducts'));


        // Get saving spotlight products
        builder
            .addCase(apiGetSavingSpotlightProducts.fulfilled, paginateFulfilled('savingSpotlightProducts'))
            .addCase(apiGetSavingSpotlightProducts.pending, paginatePending('savingSpotlightProducts'))
            .addCase(apiGetSavingSpotlightProducts.rejected, paginateRejected('savingSpotlightProducts'));


        // Get guaranteed products
        builder
            .addCase(apiGetGuaranteedProducts.fulfilled, paginateFulfilled('guaranteedProducts'))
            .addCase(apiGetGuaranteedProducts.pending, paginatePending('guaranteedProducts'))
            .addCase(apiGetGuaranteedProducts.rejected, paginateRejected('guaranteedProducts'));


        // Get best saler product
        builder
            .addCase(apiGetBestSalerProducts.fulfilled, paginateFulfilled('bestSalerProducts'))
            .addCase(apiGetBestSalerProducts.pending, paginatePending('bestSalerProducts'))
            .addCase(apiGetBestSalerProducts.rejected, paginateRejected('bestSalerProducts'));


        // Get product detail
        builder
            .addCase(apiGetProductDetail.fulfilled, (state, action) => {
                state.productDetail.isLoading = false;
                if (action.payload?.attributes?.length) {
                    action.payload.attributes = action.payload?.attributes?.map((attribute, index) => {
                        attribute.terms = attribute.terms.map((term, idx) => {
                            term.active = idx === 0;
                            return term;
                        });
                        return { ...attribute };
                    })
                }
                state.productDetail.detail = action.payload;
            })
            .addCase(apiGetProductDetail.pending, (state, action) => {
                state.productDetail.isLoading = true;
            })
            .addCase(apiGetProductDetail.rejected, (state, action) => {
                state.productDetail.isLoading = false;
            });
    },
})

export const { manageProductForCart, setAddedInCart } = slice.actions

export default slice.reducer