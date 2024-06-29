import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TTodo = {
  id?: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  isCompleted?: boolean;
};
export type TTodoFromServer = TTodo & { _id: string };

type TTodoState = {
  todos: TTodo[];
  filterTodos: TTodo[];
};
const todoInitialState: TTodoState = {
  todos: [],
  filterTodos: [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState: todoInitialState,
  reducers: {
    addTodo(state, action: PayloadAction<TTodo>) {
      const pendingTodos = state.todos.filter(
        (todo) => todo.isCompleted === false
      );
      const completedTodos = state.todos.filter(
        (todo) => todo.isCompleted === true
      );
      state.todos = [...pendingTodos, action.payload, ...completedTodos];
    },
    deleteFromTodo(state, action: PayloadAction<Pick<TTodo, "id">>) {
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      state.todos = filteredTodos;
    },
    toggleComplete(state, action: PayloadAction<Pick<TTodo, "id">>) {
      // Toggle completion status in state.todos
      const mainTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      // Reorder state.todos with completed todos at the end
      const pendingTodos = mainTodos.filter((todo) => !todo.isCompleted);
      const completedTodos = mainTodos.filter((todo) => todo.isCompleted);
      state.todos = [...pendingTodos, ...completedTodos];

      // Update filterTodos based on the reordered todos
      const filterTodos = state.filterTodos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      // Reorder state.filterTodos with completed todos at the end
      const pendingFilteredTodos = filterTodos.filter(
        (todo) => !todo.isCompleted
      );
      const completedFilteredTodos = filterTodos.filter(
        (todo) => todo.isCompleted
      );
      state.filterTodos = [...pendingFilteredTodos, ...completedFilteredTodos];
    },
    filterAccordingPriority(
      state,
      action: PayloadAction<Pick<TTodo, "priority">>
    ) {
      const filteredTodos = state.todos.filter(
        (todo) => todo.priority === action.payload.priority
      );

      const pendingTodos = filteredTodos.filter(
        (todo) => todo.isCompleted === false
      );
      const completedTodos = filteredTodos.filter(
        (todo) => todo.isCompleted === true
      );
      state.filterTodos = [...pendingTodos, ...completedTodos];
    },
  },
});

export const {
  addTodo,
  deleteFromTodo,
  toggleComplete,
  filterAccordingPriority,
} = todoSlice.actions;

export default todoSlice.reducer;
