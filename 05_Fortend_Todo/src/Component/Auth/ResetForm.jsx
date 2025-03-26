import { useEffect, useState } from "react";

import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  logOutUser,
  ResetPasswordAction,
} from "../../redux/slice/authenticationSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetFormCom = () => {
  const parameters = useParams();

  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getError = useSelector((state) => state.authenticationReducer.error);
  const getStatus = useSelector((state) => state.authenticationReducer.status);

  const token = parameters.token;

  useEffect(() => {
    if (getStatus === "Fulfilled") {
      toast.success("Successfully  Reset The  Password");
      dispatch(clearError());
      setTimeout(() => {
        dispatch(logOutUser());
        navigate("/login");
      }, 2000);
    }
    if (getStatus === "Failed") {
      toast.error(getError);
    }

    setPassword("");
    setNewPassword("");
  }, [getStatus, getError]);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(ResetPasswordAction({ token, password }));
  }

  return (
    <div
      className="flex flex-col items-center
         bg-slate-700 gap-4 p-5 border border-gray-300 rounded-md w-80 mx-auto"
    >
      <div>
        <h2 className="text-white text-2xl font-bold">Reset Password Form </h2>
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="relative w-full mb-2">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
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
          type={showPassword ? "text" : "password"}
          name="newpassword"
          placeholder="Confirm Password"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>

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
    </div>
  );
};

export default ResetFormCom;
