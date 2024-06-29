import { MdDelete, MdEdit } from "react-icons/md";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../store/api/api";
import { TTodoFromServer } from "../../store/features/todoSlice";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const TodoCard = ({ todo }: { todo: TTodoFromServer }) => {
  // const dispatch = useAppDispatch();
  // const handleDelete = (id: string) => {
  //   const confirm = window.confirm("Arr you sure to delete this todo?");
  //   if (confirm) {
  //     dispatch(deleteFromTodo({ id }));
  //   }
  // };
  // const toggleStatus = (id: string) => {
  //   dispatch(toggleComplete({ id }));
  // };
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const toggleStatus = () => {
    const data = {
      isCompleted: !todo.isCompleted,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    };
    const options = {
      _id: todo._id,
      data,
    };
    updateTodo(options);
  };
  const handleDelete = () => {
    const confirm = window.confirm("Arr you sure to delete this todo?");
    if (confirm) deleteTodo(todo._id);
  };
  return (
    <div className="flex justify-between bg-white px-4 py1  font-medium items-center border-b-2">
      <Checkbox
        name="completeStatus"
        id="completeStatus"
        className="cursor-pointer mr-8"
        defaultChecked={todo.isCompleted}
        onCheckedChange={toggleStatus}
      />
      <p className="flex-1">{todo.title}</p>
      <div className="flex-1">
        {todo.isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>
      <div className="flex-1 flex items-center space-x-2">
        <div
          className={`w-3 h-3  rounded-full 
            ${todo.priority === "low" && "bg-green-400"}
            ${todo.priority === "medium" && "bg-yellow-400"}
            ${todo.priority === "high" && "bg-red-400"}
          `}
        ></div>
        <p>
          {todo.priority.charAt(0).toUpperCase() + todo.priority.substring(1)}
        </p>
      </div>
      <p className="flex-[2]">{todo.description}</p>
      <div className="space-x-3 text-black">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:text-red-600 text-red-400"
          onClick={handleDelete}
        >
          <MdDelete size={20} />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:text-blue-600 text-blue-400"
        >
          <MdEdit size={20} />
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
