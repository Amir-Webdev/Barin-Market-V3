import { REVIEW_URL, USER_URL } from "../../../constants/constants";
import { apiSlice } from "./apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `${USER_URL}/verify?token=${token}`,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USER_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    forgetPasswordRequest: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/forgetpassword`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordRequest: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/resetpassword`,
        method: "POST",
        body: data,
      }),
    }),
    getUserReviews: builder.query({
      query: () => ({
        url: `${REVIEW_URL}`,
      }),
      invalidatesTags: ["User", "Product"],
    }),
    deleteUserReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/${data.userId}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["User", "Product"],
    }),
    editUserReview: builder.mutation({
      query: ({ newComment, newRating, reviewId, userId }) => ({
        url: `${REVIEW_URL}/${userId}`,
        method: "PUT",
        body: { newComment, newRating, reviewId },
      }),
    }),
    getLikedProducts: builder.query({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}/likes`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useVerifyEmailQuery,
  useForgetPasswordRequestMutation,
  useResetPasswordRequestMutation,
  useGetUserReviewsQuery,
  useDeleteUserReviewMutation,
  useGetLikedProductsQuery,
  useEditUserReviewMutation,
} = userApiSlice;
