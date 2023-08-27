import { useState } from "react";
import EditIcon from "../icons/EditIcon";
import { Column, Id, Task } from "../types";
import PlusIcon from "../icons/PlusIcon";
import TaskBox from "./TaskBox";

interface Props {
  column: Column;
  editColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  tasks: Task[];
}

function ColumnBox(props: Props) {
  const { column, editColumn, createTask, tasks } = props;

  const [editMode, setEditMode] = useState(false);

  return (
    <div
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
    text-grey
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
            0
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
        {tasks.map((task) => (
          <TaskBox key={task.id} task={task} />
        ))}
      </div>
      <button
        className="bg-navy
        text-grey
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
