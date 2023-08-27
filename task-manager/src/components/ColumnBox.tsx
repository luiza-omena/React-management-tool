import { useMemo, useState } from "react";
import EditIcon from "../icons/EditIcon";
import { Column, Id, Task } from "../types";
import PlusIcon from "../icons/PlusIcon";
import TaskBox from "./TaskBox";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  editColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  editTask: (id: Id, content: string) => void;
  tasks: Task[];
}

function ColumnBox(props: Props) {
  const { column, editColumn, createTask, deleteTask, editTask, tasks } = props;
  console.log(tasks.length);
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-columnBackgroundColor
      opacity-40
      border-2
      border-pink-500
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-grey
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
  "
    >
      <div
        onClick={() => {
          setEditMode(true);
        }}
        className="
    
    bg-navy
    text-md
    h-[60px]
    rounded-md
    p-3
    font-bold
    border-grey
    border-2
    flex
    items-center
    justify-between
    "
      >
        <div className="flex gap-2">
          <div
            className="
        flex
        justify-center
        items-center
        bg-grey
        text-darkBlue
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            {tasks.length}
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-grey focus:border-rose-100 border rounded outline-none px-2 text-darkBlue"
              value={column.title}
              onChange={(e) => editColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  setEditMode(false);
                } else {
                  return;
                }
              }}
            />
          )}
        </div>
        <button
          className="
                stroke-grey
                hover:stroke-white
                hover:bg-darkBlue
                rounded
                px-1
                py-2
                "
        >
          <EditIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskBox
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="bg-navy
        text-md
        h-[60px]
        rounded-md
        p-3
        font-bold
        border-grey
        border-2
        flex
        items-center
        justify-between
        hover:text-rose-100
        hover:bg-darkBlue
        "
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnBox;
