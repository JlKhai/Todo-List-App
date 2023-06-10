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
      providesTags: ['todoApi'],
    }),
    updateTodo: builder.mutation({
      query: (newTodo) => ({
        url: `/todos/${newTodo.id}`,
        method: 'PATCH',
        body: newTodo,
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
  useUpdateTodoMutation,
} = todoApi
