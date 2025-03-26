import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  SignUpActions,
  clearError,
} from "../../redux/slice/authenticationSlice";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utlis/validation";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getError = useSelector((state) => state.authenticationReducer.error);
  const getStatus = useSelector((state) => state.authenticationReducer.status);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);



  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("Email or Password or confirmPassword is Empty");
      return;
    }

    if (password !== confirmPassword) {
      toast.error(" Password and confirmPassword are not same");
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
    dispatch(SignUpActions(data));
  }

  useEffect(() => {
    if (getStatus === "Fulfilled") {
      toast.success("Successfully Signed Up");
      dispatch(clearError());
      navigate("/login");
    } else if (getStatus === "Failed") {
      toast.error(getError);
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [getStatus, getError]);

  return (
    <div
      className="flex flex-col items-center
     bg-slate-700 gap-4 p-5 border border-gray-300 rounded-md w-96 mx-auto"
    >
      <div>
        <h2 className="text-white text-2xl font-bold">Sign Up</h2>
      </div>
      <div>
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
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
      <div className="relative w-full mb-2">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      <button className="flex items-center justify-center p-2 w-full mb-2 bg-gray-200 rounded">
        <FaGoogle className="mr-2" /> Login with Gmail
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
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
