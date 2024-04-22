import { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Spinner } from "./components";
import Layout from "./layouts/layout";
import HomeLayout from "./layouts/HomeLayout";

import { Login, Profile, ProtectedRoutes, Register, Restaurant } from "./pages";
import Test from "./pages/Test";
import store from "./store/store";
import { Provider } from "react-redux";
import { getUserData } from "./store/userSlice";

const router = createBrowserRouter([
  {
    index: true,
    element: (
      <Suspense fallback={<Spinner />}>
        <HomeLayout />
      </Suspense>
    ),
  },

  {
    element: (
      <Suspense fallback={<Spinner />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/user-profile", element: <Profile /> },
          { path: "/manage-restaurant", element: <Restaurant /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/test", element: <Test /> },
      { path: "*", element: <div>Page not found</div> },
    ],
  },
]);

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    store
      .dispatch(getUserData())
      .unwrap()
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Provider store={store}>
      {loading ? <Spinner /> : <RouterProvider router={router} />}
      <Toaster position="top-center" />
    </Provider>
  );
};

export default App;
