import { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { Id, Task } from "../types";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

function TaskBox({ task, deleteTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

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
  cursor-grab relative task
  "
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {task.content}
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white 
      absolute 
      right-4 
      top-1/2 -translate-y-1/2 
      bg-navy
      p-2 rounded 
      opacity-50 
      hover:opacity-100
      hover:bg-darkBlue"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}

export default TaskBox;
