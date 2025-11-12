import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";

import App from "./App.jsx";
import Dashboard from "./pages/Dashboad.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* ✅ PUBLIC Dashboard */}
      <Route index element={<Dashboard />} />

      {/* ✅ PROTECTED Home */}
      <Route
        path="home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* ✅ AUTH Pages */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
