import { useMemo, useState } from "react";
import EditIcon from "../icons/EditIcon";
import { List, Id, Task } from "../types";
import PlusIcon from "../icons/PlusIcon";
import TaskBox from "./TaskBox";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  list: List;
  editList: (id: Id, title: string) => void;

  createTask: (listId: Id) => void;
  deleteTask: (id: Id) => void;
  editTask: (id: Id, content: string) => void;
  tasks: Task[];
}

function ListBox({
  list,
  editList,
  createTask,
  deleteTask,
  editTask,
  tasks,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: list.id,
    data: {
      type: "List",
      list,
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
      bg-BlueWhite
      opacity-40
      border-2
      w-[80vw] lg:w-[18.2vw]
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
    bg-blueWhite
    w-[80vw] lg:w-[18.2vw]
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
    
    bg-node
    text-md
    h-[60px]
    rounded-md
    p-3
    font-bold
    border-blueWhite
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
        bg-darkGreen
        text-darkBlue
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            {tasks.length}
          </div>
          {!editMode && list.title}
          {editMode && (
            <input
              className="bg-blueWhite focus:border-darkGreen border rounded outline-none px-2"
              value={list.title}
              onChange={(e) => editList(list.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  console.log(e);
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
                stroke-blueWhite
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
        className="bg-none
        text-md
      
        h-[60px]
        rounded-md
        p-3
        font-bold
        border-blueWhite
        border-2
        flex
        items-center
        justify-between
        hover:bg-darkBlue
        "
        onClick={() => {
          createTask(list.id);
        }}
      >
        <PlusIcon />
        Add card
      </button>
    </div>
  );
}

export default ListBox;
