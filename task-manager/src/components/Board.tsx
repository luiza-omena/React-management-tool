import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import { Column } from "../types";
import ColumnBox from "./ColumnBox";

function Board() {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);
  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    "
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnBox column={col} />
          ))}
        </div>
        <button
          onClick={() => {
            createColumn();
          }}
          className="
        h-[60px]
        w-[300px]
        min-w-[350px]
        cursor-pointer
        rounded-lg
        bg-navy
        border-2
        border-darkBlue
        p-4
        ring-rose-100
        hover:ring-2
        flex
        gap-2
        "
        >
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );

  function createColumn() {
    const addColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, addColumn]);
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}
export default Board;
