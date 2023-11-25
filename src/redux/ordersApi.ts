import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '@/lib/types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Orders'],
  endpoints: build => ({
    getOrders: build.query<Order[], string>({
      query: () => `orders`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders' as const, id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),

    addOrder: build.mutation({
      query: body => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),

    updateOrder: build.mutation({
      query: ({ id, body }) => ({
        url: `orders/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),

    deleteOrder: build.mutation({
      query: id => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
