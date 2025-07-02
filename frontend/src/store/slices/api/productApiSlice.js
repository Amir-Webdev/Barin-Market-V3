import { PRODUCT_URL, REVIEW_URL } from "../../../constants/constants";
import { apiSlice } from "./apiSlice.js";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, page, category, brand, price, rating, sort }) => ({
        url: PRODUCT_URL,
        params: { keyword, page, category, brand, price, rating, sort },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductFilters: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/filters`,
      }),
    }),
    getProductById: builder.query({
      query: (id) => `${PRODUCT_URL}/${id}`,
      keepUnusedDataFor: 5,
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImages: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}/images`,
        method: "POST",
        body: formData,
      }),
    }),
    deleteProductImages: builder.mutation({
      query: ({ productId, imageUrl }) => ({
        url: `${PRODUCT_URL}/${productId}/images`,
        method: "DELETE",
        params: { imageUrl },
      }),
      invalidatesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data.productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
    AddLike: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/${data.userId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Product", "User"],
    }),
    RemoveLike: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/${data.userId}/like`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product", "User"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetProductFiltersQuery,
  useUploadProductImagesMutation,
  useDeleteProductImagesMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
} = productApiSlice;
