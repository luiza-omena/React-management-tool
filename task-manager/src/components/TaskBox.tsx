import { Task } from "../types";

interface Props {
  task: Task;
}

function TaskBox({ task }: Props) {
  return (
    <div
      className="
  bg-navy
  p-2.5 h-[100px] 
  min-h-[100px] 
  items-center 
  flex 
  text-left 
  text-grey
  rounded-xl 
  hover:ring-2 
  hover:ring-inset 
  hover:ring-rose-100 
  cursor-grabs
  "
    >
      {task.content}
    </div>
  );
}

export default TaskBox;
