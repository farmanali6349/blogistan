import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SigninPage, SignupPage, Authlayout, Home, Blogs, WriteBlog } from "./components/index.js"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: (
            <Authlayout authentication={false}>
              <Home />
            </Authlayout>
          )
        },
        {
          path: "/signup",
          element: (
            <>
              <Authlayout authentication={false}>
                <SignupPage />
              </Authlayout>
            </>
          )
        },
        {
          path: "/signin",
          element: (
            <Authlayout authentication={false}>
              <SigninPage />
            </Authlayout>
          )
        },
        {
          path: "/signup",
          element: <SignupPage />
        },
        {
          path: "/blogs",
          element: <Blogs />
        },
        {
          path: "/write-blog",
          element: (
            <Authlayout authentication={true}>
              <WriteBlog />
            </Authlayout>
          )
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
