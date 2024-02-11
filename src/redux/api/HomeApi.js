import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const HomeApi = createApi({
  reducerPath: "AllPostApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["ALLPOSTS"],
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: (id) => ({
        url: `/api/getposts?user_id=${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["ALLPOSTS"],
    }),
    // getAllUserById: build.query({
    //   query: (id) => ({
    //     url: `api/getposts?user_id=${id}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   providesTags: ["ALLEMPLOYEE"],
    // }),
    // getAllemployeeBySearchData: build.query({
    //   query: (search) => ({
    //     url: `/allemployee/${search}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   providesTags: ["ALLEMPLOYEE"],
    // }),

    // addAllemployee: build.mutation({
    //     query: (data) => ({
    //       url: `/allemployee/registration`,
    //       method: "POST",
    //       body: data,
    //       headers: {
    //         "Content-Type": "application/json; charset=UTF-8",
    //       },
    //     }),
    //     invalidatesTags: ["ALLEMPLOYEE"],
    //   }),
     

    editLike: build.mutation({
      query: ({id,data }) => ({
        url: `api/updateposts?post_id=65b3c286d4c2ef920561ab3a`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["ALLPOSTS"],
    }),
    // deleteAllemployee: build.mutation({
    //   query: (id) => ({
    //     url: `/allemployee/delete/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   invalidatesTags: ["ALLEMPLOYEE"],
    // }),
  }),
});

export const { 
    useGetAllPostsQuery,
    useEditLikeMutation
} = HomeApi;