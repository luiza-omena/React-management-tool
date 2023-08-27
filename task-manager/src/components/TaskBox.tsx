import { Task } from "../types";

interface Props {
  task: Task;
}

function TaskBox({ task }: Props) {
  return <div>{task.content}</div>;
}

export default TaskBox;
