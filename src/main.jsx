import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import AuthLayout from "./components/AuthLayout.jsx";

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
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/create-blog",
        element: (
          <AuthLayout authentication={true}>
            <CreateBlog />
          </AuthLayout>
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
          <AuthLayout authentication={true}>
            <EditAccount />
          </AuthLayout>
        ),
      },
      {
        path: "/account",
        element: (
          <AuthLayout authentication={true}>
            <MyAccount />
          </AuthLayout>
        ),
      },
      {
        path: "/create-categories",
        element: (
          <AuthLayout authentication={true}>
            <CreateCategoriesPage />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-blog/:blogId",
        element: (
          <AuthLayout authentication={true}>
            <EditBlog />
          </AuthLayout>
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
