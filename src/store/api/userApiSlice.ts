import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserState } from "../userSlice";

export const userApi = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1" }),
  reducerPath: "userApi",
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    login: builder.mutation({
      query: ({ email, password }: {
        email: string;
        password: string;
      }) => ({
        url: "/user/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    getProfile: builder.query<IUserState, string>({
      query: (bearer) => ({
        url: "/user/profile",
        headers: { Authorization: `Bearer ${bearer}` },
        method: "POST",
      }),
      transformResponse: (response: {
        status: 200;
        body: IUserState;
        message: string;
      }) => {return response.body}
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useGetProfileQuery } = userApi;