import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./components/Root";
import { Search } from "./components/search/Search";
import { Upload } from "./components/upload/Upload";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { About } from "./components/about/About";
import { Provider } from "react-redux";
import { Login } from "./components/login/Login";
import { RequireAuth } from "./components/RequireAuth";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Registration } from "./components/registration/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Search />
          </RequireAuth>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/search",
        element: (
          <RequireAuth>
            <Search />
          </RequireAuth>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/upload",
        element: <Upload />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
