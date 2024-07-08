import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { ProfilePage } from "../pages/ProfilePage";
import { CompaniesPage } from "../pages/CompaniesPage";
import { CompanyDetailPage } from "../pages/CompanyDetailPage";
import { UsersPage } from "../pages/UsersPage";
import { UserDetailPage } from "../pages/UserDetailPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "companies",
        element: <CompaniesPage />,
      },
      {
        path: "companyDetail",
        element: <CompanyDetailPage />,
      },
      {
        path: "companyDetail/:id",
        element: <CompanyDetailPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "userDetail",
        element: <UserDetailPage />,
      },
      {
        path: "userDetail/:id",
        element: <UserDetailPage />,
      },
    ],
  },
]);
