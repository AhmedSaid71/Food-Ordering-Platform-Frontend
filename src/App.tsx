import { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Spinner } from "./components";
import Layout from "./layouts/layout";
import HomeLayout from "./layouts/HomeLayout";

import {
  Login,
  MyRestaurant,
  Profile,
  ProtectedRoutes,
  Register,
  Restaurant,
  Restaurants,
} from "./pages";
import Test from "./pages/Test";
import store from "./store/store";
import { Provider } from "react-redux";
import { getUserData } from "./services/apiUser";

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
          { path: "/manage-restaurant", element: <MyRestaurant /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/restaurant/:id", element: <Restaurant /> },
      { path: "/restaurants/:city", element: <Restaurants /> },
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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 4000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            textAlign: "center",
          },
        }}
      />
    </Provider>
  );
};

export default App;
