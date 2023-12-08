import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Customer } from '@/lib/types';

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Customers'],
  endpoints: build => ({
    getCustomers: build.query<Customer[], string>({
      query: () => `customers`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Customers' as const, _id })),
              { type: 'Customers', id: 'LIST' },
            ]
          : [{ type: 'Customers', id: 'LIST' }],
    }),

    addCustomer: build.mutation({
      query: body => ({
        url: 'customers',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }],
    }),

    updateCustomer: build.mutation({
      query: ({ id, body }) => ({
        url: `customers/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }],
    }),

    deleteCustomer: build.mutation({
      query: id => ({
        url: `customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
