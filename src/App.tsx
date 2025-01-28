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
        <FormModalProvider>
          <ConfirmModalProvider>
            <TaskProvider>
              <SortProvider>
                <div className="max-w-[1400px] m-auto mb-10">
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/current" element={<CurrentPage />} />
                    <Route path="/todo" element={<ToDoPage />} />
                    <Route path="/done" element={<DonePage />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </div>
              </SortProvider>
            </TaskProvider>
          </ConfirmModalProvider>
        </FormModalProvider>
      </Router>
    </>
  );
}

export default App;
