import DeleteIcon from "../icons/DeleteIcon";
import { Column, Id } from "../types";

interface Props {
  column: Column;
}

function ColumnBox(props: Props) {
  const { column } = props;
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
          {column.title}
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
