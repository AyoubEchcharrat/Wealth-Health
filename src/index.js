import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Layouts/Layout";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import EmployeeList from "./pages/EmployeeList/EmployeeList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} >
      <Route path="/" element={<CreateEmployee />} />
      <Route path="/employee-list" element={<EmployeeList />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);