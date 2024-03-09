import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";
let userId = "";
const user = localStorage.getItem("user");
if (user) {
  userId = JSON.parse(user).userId ?? "";
  console.log('====================================');
  console.log(userId);
  console.log('====================================');
}

export const CommunityApi = createApi({
  reducerPath: "CommunityApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["COMMUNITY"],
  endpoints: (build) => ({
    getCommunity: build.query({
      query: () => ({
        url: `api/getcommunityposts?user_id=${userId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["COMMUNITY"],
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
     
    createCommunity: build.mutation({
      query: ({communityName}) => ({
        url: `/api/updateUsers`,
        method: "PUT",
        body:{
            "user_id":userId,
            "communityName":communityName
        },
       
      }),
      invalidatesTags: ["COMMUNITY"],
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
    useCreateCommunityMutation,
    useGetCommunityQuery
} = CommunityApi;