import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  LoginPage,
  RegisterPage,
  ChangePasswordPage,
  ForgotPasswordPage,
  ResetFormPage,
  VerificationUserPage,
  ProctectedRoute,
  SucessVerify,
} from "./Component/Auth/index.js";


import Dashboard from "./Component/TodoList/Dashboard.jsx";

import Layout from "./Component/Layout.jsx";
import GoogleCallback from "./Component/Auth/GoogleCallback.jsx";
import FailedGoogleAuth from "./Component/Auth/FailedGoogleAuth.jsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<RegisterPage />} />

      <Route path="goggle/verify/:data" element={<GoogleCallback />} />
      <Route path="goggle/verify/failed" element={<FailedGoogleAuth/>} />

      <Route path="forgetpassword" element={<ForgotPasswordPage />} />
      <Route path="resetform/:token" element={<ResetFormPage />} />

      <Route element={<ProctectedRoute />}>
        <Route path="sucessVerify/:data" element={<SucessVerify />} />

        <Route path="changepassword" element={<ChangePasswordPage />} />
        <Route path="verification" element={<VerificationUserPage />} />

        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </Provider>
);
