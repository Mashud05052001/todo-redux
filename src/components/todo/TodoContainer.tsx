import { useState } from "react";
import { useGetTodosQuery } from "../../store/api/api";
import { TTodoFromServer } from "../../store/features/todoSlice";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";

const TodoContainer = () => {
  const [priority, setPriority] = useState<"" | "high" | "medium" | "low">("");
  const { isLoading, data: allTodos } = useGetTodosQuery(priority, {});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [isShowAll, setIsShowAll] = useState(true);
  // const { todos, filterTodos } = useAppSelector((state) => state.todos);
  // const showingTodos = isShowAll ? todos : filterTodos;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex justify-between">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="w-full p-1.5 rounded-lg my-8 bg-primary-gradiant">
        <div className="p-3 bg-white rounded-lg space-y-2.5">
          {/* {showingTodos.length ? (
            showingTodos.map((todo) => <TodoCard todo={todo} key={todo.id} />) */}
          {allTodos?.data?.length ? (
            allTodos?.data?.map((todo: TTodoFromServer) => (
              <TodoCard todo={todo} key={todo._id} />
            ))
          ) : (
            <div className="text-2xl font-bold  bg-white flex justify-center items-center py-3 rounded-md ">
              There is no task pending
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
