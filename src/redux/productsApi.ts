import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/lib/types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Products'],
  endpoints: build => ({
    getProducts: build.query<Product[], string>({
      query: () => `products`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    addProduct: build.mutation({
      query: body => ({
        url: 'products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    deleteProduct: build.mutation({
      query: id => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
