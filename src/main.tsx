import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import Layout from "./routes/layout.tsx";
import Home from "./routes/home.tsx";
import Checkout from "./routes/checkout.tsx";
import { bookLoader } from "./loaders/bookLoader.ts";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: bookLoader },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
