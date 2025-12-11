import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PageNotFound from "pages/404";
import AdminPage from "pages/AdminPage";
import AuthPage from "pages/AuthPage";
import DashboardPage from "pages/DashboardPage";
import HomePage from "pages/HomePage";
import Loader from "components/modules/Loader";
import { getProfile } from "services/user";
import AdminOptions from "src/pages/AdminOptions";

function Router() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  console.log({ data, isLoading, error });
  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route path="/auth" element={data ? <Navigate to="/" /> : <AuthPage />} />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/options"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminOptions />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
