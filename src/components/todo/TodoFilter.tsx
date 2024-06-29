"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type TPriority = "" | "low" | "medium" | "high";
type TTodoFilterProps = {
  priority: TPriority;
  setPriority: React.Dispatch<React.SetStateAction<TPriority>>;
};
// const TodoFilter = ({ setIsShowAll }: TTodoFilterProps) => {
// const dispatch = useAppDispatch();
// const handlePriorityChange = (value: TPriority) => {
//   setPriority(value);
// if (value === "all") {
//   setIsShowAll(true);
// } else {
//   dispatch(filterAccordingPriority({ priority: value }));
//   setIsShowAll(false);
// }
// };
// .....
// }
const TodoFilter = ({ priority, setPriority }: TTodoFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary-gradiant text-white font-semibold w-28 text-base hover:text-white"
        >
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuLabel>Filter by priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value) => {
            setPriority(value as TPriority);
          }}
        >
          <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoFilter;
