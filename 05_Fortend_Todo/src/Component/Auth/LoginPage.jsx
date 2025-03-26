import React, { useEffect, useState } from "react";
import { FaGoogle, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginAction,
  clearError,

} from "../..//redux/slice/authenticationSlice";
import toast, { Toaster } from "react-hot-toast";

import { validateEmail, validatePassword } from "../../utlis/validation";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const getError = useSelector((state) => state.authenticationReducer.error);
  const getStatus = useSelector((state) => state.authenticationReducer.status);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (getStatus === "Fulfilled") {
      toast.success("Successfully Logged in");
      navigate("/dashboard");
    }
    if (getStatus === "Failed") {
      toast.error(getError);
    }
    setEmail("");
    setPassword("");
    setRemember(false);
  }, [getStatus, getError]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email or Password is Empty");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email Validation Failed");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password Validation Failed");
      toast.error(
        "Password should contain 1 Special characters, 1 Uppercase , 1 lowercase, 8 minimum length"
      );
      return;
    }

    const data = { email, password };
    console.log(data);
    dispatch(LoginAction(data));
  }

  function handleLoginwithGmail() {

    
    window.location.href = 'http://localhost:3000/authservice/auth/google';
  }

  return (
    <div
      className="flex flex-col items-center
         bg-slate-700 gap-4 p-5 border border-gray-300 rounded-md w-96 mx-auto"
    >
      <div>
        <h2 className="text-white text-2xl font-bold">Welcome to Login Page</h2>
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 w-full mb-2 border border-gray-300 rounded"
      />
      <div className="relative w-full mb-2">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      <div className="flex items-center justify-between w-full mb-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setRemember(!remember)}
        >
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <label className="cursor-pointer">Remember</label>
        </div>
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-400 
        transition duration-300"
        >
          <Link to="/forgetpassword">Forget password</Link>
        </button>
      </div>
      <button
        onClick={handleLoginwithGmail}
        className="flex items-center justify-center p-2 w-full mb-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
      >
        <FaGoogle className="mr-2  " /> Login with Gmail
      </button>

      <button
        onClick={handleSubmit}
        className="flex items-center justify-center p-2 w-full bg-blue-500 text-white rounded"
        disabled={getStatus === "Loading"}
      >
        {getStatus === "Loading" ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : null}
        {getStatus === "Loading" ? "Submitting..." : "Submit"}
      </button>

      <div className="text-lg font-medium">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
