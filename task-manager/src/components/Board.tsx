import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnBox from "./ColumnBox";
import logo from "../assets/logoAvant.svg";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import TaskBox from "./TaskBox";
import { arrayMove } from "@dnd-kit/sortable";

function Board() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <>
      <header className="bg-darkGreen p-[40px]">
        <div className="flex items-center gap-7">
          <img src={logo} alt="lu icon" className="w-[5%]" />
          <h1 className="text-lightWhite font-bold text-2xl">AvantManager</h1>
        </div>
      </header>
      <div className="m-[40px]">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-4 flex-col lg:flex-row items-center lg:items-start">
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              {columns.map((col) => (
                <ColumnBox
                  column={col}
                  editColumn={editColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </div>

            {columns.length < 5 && (
              <button
                onClick={() => {
                  if (columns.length < 5) {
                    createColumn();
                  }
                }}
                className="
                    h-[60px]
                    w-[80vw] lg:w-[18.2vw]
                    cursor-pointer
                    rounded-lg
                    bg-blueWhite
                    border-2
                    border-darkBlue
                    p-4
                    ring-darkGreen
                    hover:ring-2
                    flex
                    gap-2
                    "
              >
                <PlusIcon />
                Add Column
              </button>
            )}
          </div>

          {createPortal(
            <DragOverlay>
              {activeTask && (
                <TaskBox
                  task={activeTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function editTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }
  function createColumn() {
    const addColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, addColumn]);
  }
  function editColumn(id: Id, title: string) {
    const newTitle = columns.map((col) => {
      if (col.id !== id) {
        return col;
      }
      return { ...col, title };
    });

    setColumns(newTitle);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((i) => i.id === activeId);
        const overIndex = tasks.findIndex((i) => i.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}
export default Board;
