import { Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ProctectedRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const { isLogin, email, token } = currentUser;

  useEffect(() => {
    if (!isLogin && !token) toast.error("You have to Login ");
  }, [isLogin, token]);

  return (
    <>
      {isLogin ? (
        <Outlet />
      ) : (
        <div>
          {" "}
          <Toaster position="top-right" reverseOrder={false} />{" "}
          <Navigate to="/login" />{" "}
        </div>
      )}
    </>
  );
};

export default ProctectedRoute;
