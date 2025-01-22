import TaskList from "../components/TaskList";
import "./homepage.scss";

export default function CurrentPage() {
  return (
    <>
      <TaskList tasksToGet="En cours" />
    </>
  );
}
