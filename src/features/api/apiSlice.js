import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
  }),
  tagTypes: ['todoApi'],
  endpoints: (builder) => ({
    getTodo: builder.query({
      query: () => '/todos',
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ['todoApi'],
    }),
    addTodo: builder.mutation({
      query: (addTodo) => ({
        url: `/todos`,
        method: 'POST',
        body: addTodo,
      }),
      invalidatesTags: ['todoApi'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['todoApi'],
    }),
  }),
})

export const {
  useGetTodoQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
} = todoApi
