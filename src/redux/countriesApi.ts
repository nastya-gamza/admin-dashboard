import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Country } from '@/lib/types';

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Countries'],
  endpoints: build => ({
    getCountries: build.query<Country[], string>({
      query: () => `countries`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ name }) => ({ type: 'Countries' as const, name })),
              { type: 'Countries', id: 'LIST' },
            ]
          : [{ type: 'Countries', id: 'LIST' }],
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
