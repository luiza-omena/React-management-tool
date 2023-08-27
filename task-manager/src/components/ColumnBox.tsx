import { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { Column, Id } from "../types";

interface Props {
  column: Column;
  editColumn: (id: Id, title: string) => void;
}

function ColumnBox(props: Props) {
  const { column, editColumn } = props;

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
    cursor-grab
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
                stroke-gray-500
                hover:stroke-white
                hover:bg-columnBackgroundColor
                rounded
                px-1
                py-2
                "
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
}

export default ColumnBox;
