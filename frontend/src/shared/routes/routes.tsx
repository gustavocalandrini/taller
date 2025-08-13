import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/home";
import PageNotFound from "../../pages/error/page-not-found";
import MainLayout from "../layout/layout";
import Tasks from "../../pages/task/task";
import TaskUpdate from "../../pages/task/task-update";
import TaskCreate from "../../pages/task/task-create";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={
        <MainLayout>
          <Home />
        </MainLayout>
      } />
      <Route path="/tasks" element={
        <MainLayout>
          <Tasks />
        </MainLayout>
      } />
      <Route path="/tasks/create" element={<TaskCreate />} />
      <Route path="/tasks/:id/edit" element={<TaskUpdate />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRoutes;