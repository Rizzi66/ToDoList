import TaskList from "../components/TaskList";
import "./homepage.scss";

export default function HomePage() {
  return (
    <>
      <TaskList tasksToGet="All" />
    </>
  );
}
