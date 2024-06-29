import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["todo", "high", "medium", "low"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) params.append("priority", priority);
        return {
          // meathod 1
          //   url: `/tasks?priority=${priority}`,
          url: "/tasks",
          method: "GET",
          // meathod 3. making a params object using URLSearchParams
          params,
          // meathod 2
          //   params: {
          //     priority,
          //   },
        };
      },
      providesTags: ["todo"],
      //   providesTags: (result, error, priority) => ["todo", priority],
    }),
    addTodo: builder.mutation({
      query: (data) => {
        return {
          url: "/task",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => {
        return {
          url: `/task/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation({
      query: (option) => {
        console.log("inside api ", option);
        return {
          url: `/task/${option._id}`,
          method: "PUT",
          body: option.data, // Must backend e object pathate hobe
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = baseApi;
