import { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  editTask: (id: Id, content: string) => void;
}

function TaskBox({ task, deleteTask, editTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-40
        bg-white
        p-2.5 h-[100px] 
        min-h-[100px] 
        items-center 
        flex 
        text-left 
        rounded-xl 
        border-2
        border-darkGreen
        cursor-grab relative
  "
      ></div>
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="
        bg-white
      p-2.5 h-[100px] 
      min-h-[100px] 
      items-center 
      flex 
      text-left 
      
      rounded-xl 
      hover:ring-2 
      hover:ring-inset 
      hover:ring-darkGreen 
      cursor-grab relative task
      "
      >
        <textarea
          className="
        h-[90%]
        w-full 
        resize-none 
        border-none 
        rounded 
        bg-transparent 
         
        focus:outline-none
        "
          value={task.content}
          autoFocus
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleEditMode();
            }
          }}
          onChange={(e) => editTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="
  bg-white
  p-2.5 h-[100px] 
  min-h-[100px] 
  items-center 
  flex 
  text-left 
  
  rounded-xl 
  hover:ring-2 
  hover:ring-inset 
  hover:ring-darkGreen 
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
      bg-white
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
