import { useEffect, useState } from "react";

import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  ForgetProcessAction,
} from "../../redux/slice/authenticationSlice";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail } from "../../utlis/validation";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const getError = useSelector((state) => state.authenticationReducer.error);
  const getStatus = useSelector((state) => state.authenticationReducer.status);

  const data = JSON.parse(localStorage.getItem("currentUser")) || {};

  const getEmail = data.email || null;

  const [email, setEmail] = useState(getEmail);

    useEffect(() => {
      return () => {
        dispatch(clearError());
      };
    }, [dispatch]);

  useEffect(() => {
    if (getStatus === "Fulfilled") {
      toast.success("Successfully  Send Link to ", email);
    }
    if (getStatus === "Failed") {
      toast.error(getError);
    }
    setEmail(getEmail);
  }, [getStatus, getError]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Email or Password is Empty");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email Validation Failed");
      return;
    }

    dispatch(ForgetProcessAction({ email }));
  }

  return (
    <div
      className="flex flex-col items-center
         bg-slate-700 gap-4 p-5 border border-gray-300 rounded-md w-80 mx-auto"
    >
      <div>
        <h2 className="text-white text-2xl font-bold">
          Forget Password Process{" "}
        </h2>
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

      <button
        onClick={handleSubmit}
        className="flex items-center justify-center p-2 w-full bg-blue-500 text-white rounded"
        disabled={getStatus === "Loading"}
      >
        {getStatus === "Loading" ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : null}
        {getStatus === "Loading" ? "Submitting..." : "Sumbit"}
      </button>
      <p className="text-blue-500 text-lg font-bold">
        To Reset Password, Verification send to your email
      </p>
    </div>
  );
};

export default ForgetPassword;
