/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { TTodo } from "../../store/features/todoSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAddTodoMutation } from "../../store/api/api";

const AddTodoModal = () => {
  //   ! used it for local state management
  //   const dispatch = useAppDispatch();

  // * For server
  //? [ actualFunctionForPost , {data,isLoading,isError}]

  //   const [addTodo, { isLoading, isSuccess, isError, data }] = useAddTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget,
      task = form.task.value as string,
      description = form.description.value as string,
      priority = form.priority.value as "low" | "medium" | "high";
    const todo: TTodo = {
      title: task,
      description,
      isCompleted: false,
      priority,
    };
    //! For local state management
    // dispatch(addTodo(todo));

    //* For server calling
    addTodo(todo);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-gradiant text-white font-semibold w-28 text-base hover:text-white"
        >
          Add TODO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add your task that you want to finish
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 w-11/12 mx-auto">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-left">
                Task
              </Label>
              <Input
                required
                id="task"
                name="task"
                placeholder="Add task here"
                className="col-span-3 focus-visible:ring-0  focus-visible:ring-offset-0 focus:border-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-left">
                Priority
              </Label>
              <Select name="priority">
                <SelectTrigger className="col-span-3 focus-visible:ring-0  focus-visible:ring-offset-0 focus:border-2">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                required
                id="description"
                name="description"
                className="col-span-3 focus-visible:ring-0  focus-visible:ring-offset-0 focus:border-2"
              />
            </div>
          </div>
          <DialogFooter>
            {/* <DialogClose asChild> */}
            <Button type="submit">Add Todo</Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
