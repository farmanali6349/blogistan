import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Authlayout from "./components/AuthLayout.jsx";

import {
  Home,
  Author,
  Category,
  CreateBlog,
  EditAccount,
  Login,
  Signup,
  PageNotFound,
  MyAccount,
  CreateCategoriesPage,
  BlogPage,
  EditBlog,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <Login />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authentication={false}>
            <Signup />
          </Authlayout>
        ),
      },
      {
        path: "/create-blog",
        element: (
          <Authlayout authentication={true}>
            <CreateBlog />
          </Authlayout>
        ),
      },
      {
        path: "/author/:authorId",
        element: <Author />,
      },
      {
        path: "/blog/:blogId",
        element: <BlogPage />,
      },
      {
        path: "/category/:categoryId",
        element: <Category />,
      },
      {
        path: "/edit-account",
        element: (
          <Authlayout authentication={true}>
            <EditAccount />
          </Authlayout>
        ),
      },
      {
        path: "/account",
        element: (
          <Authlayout authentication={true}>
            <MyAccount />
          </Authlayout>
        ),
      },
      {
        path: "/create-categories",
        element: (
          <Authlayout authentication={true}>
            <CreateCategoriesPage />
          </Authlayout>
        ),
      },
      {
        path: "/edit-blog/:blogId",
        element: (
          <Authlayout authentication={true}>
            <EditBlog />
          </Authlayout>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
  // </StrictMode>,
);
