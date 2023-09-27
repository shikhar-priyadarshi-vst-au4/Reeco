import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    // //   const token = (getState() as RootState).auth.token
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`)
    //   }
    //   return headers
    // },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({url: '/data.json'}),
    }),
  })
});

export const { useGetOrdersQuery } = api
