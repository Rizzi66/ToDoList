import "./App.css";
import HomePage from "./pages/homePage";
import CurrentPage from "./pages/currentPage";
import DonePage from "./pages/donePage";
import ToDoPage from "./pages/todoPage";
import ErrorPage from "./pages/errorPage";
import Header from "./components/Header";
import { FormModalProvider, ConfirmModalProvider } from "./utils/contextModal";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { SortProvider } from "./utils/contextSort";
import { TaskProvider } from "./utils/contextTask";

function App() {
  return (
    <>
      <Router>
        <TaskProvider>
          <FormModalProvider>
            <ConfirmModalProvider>
              <SortProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/current" element={<CurrentPage />} />
                  <Route path="/todo" element={<ToDoPage />} />
                  <Route path="/done" element={<DonePage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </SortProvider>
            </ConfirmModalProvider>
          </FormModalProvider>
        </TaskProvider>
      </Router>
    </>
  );
}

export default App;
