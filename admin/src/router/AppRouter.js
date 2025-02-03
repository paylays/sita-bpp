import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultRouter } from "./default-router";

const router = createBrowserRouter(DefaultRouter);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
