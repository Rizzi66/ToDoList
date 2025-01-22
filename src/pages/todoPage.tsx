import TaskList from "../components/TaskList";
import "./homepage.scss";

export default function ToDoPage() {
  return (
    <>
      <TaskList tasksToGet="A faire" />
    </>
  );
}
