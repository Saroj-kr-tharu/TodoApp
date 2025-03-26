import { useEffect, useState } from "react";

import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  changePasswordAction,
  logOutUser,
} from "../../redux/slice/authenticationSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utlis/validation";

const ChangePasswordCom = () => {
  const getEmail = useSelector(
    (state) => state?.authenticationReducer?.curUser?.email
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getError = useSelector((state) => state.authenticationReducer.error);
  const getStatus = useSelector((state) => state.authenticationReducer.status);

  const { token } = JSON.parse(localStorage.getItem("currentUser"));



    useEffect(() => {
      return () => {
        dispatch(clearError());
      };
    }, [dispatch]);
  useEffect(() => {
    if (getStatus === "Fulfilled") {
      toast.success("Successfully  Change Password");
      dispatch(clearError());
      setTimeout(() => {
        dispatch(logOutUser());
        navigate("/login");
      }, 2000);
    }
    if (getStatus === "Failed") {
      toast.error(getError);
    }
    setEmail(getEmail);
    setPassword("");
    setNewPassword("");
  }, [getStatus, getError]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      oldPassword: password,
      newPassword: newpassword,
      token,
    };

    
    if(!email || !password || !newpassword){
      toast.error('Email or Password or newPasswrod is Empty');
      return;
    }



    if(!validateEmail(email)){
      toast.error('Email Validation Failed');
      return;
    }
    
    if(!validatePassword(password)){
      toast.error('old Password  Validation Failed');
      toast.error('Password should contain 1 Special characters, 1 Uppercase , 1 lowercase, 8 minimum length');
      return;
    }

    if(!validatePassword(newpassword)){
      toast.error('new Password  Validation Failed');
      toast.error('Password should contain 1 Special characters, 1 Uppercase , 1 lowercase, 8 minimum length');
      return;
    }

    if(password === newpassword){
      toast.error(' Password and newPasswrod must be not same');
      return;
    }

    console.log(data);
    dispatch(changePasswordAction(data));
  }

  return (
    <div
      className="flex flex-col items-center
         bg-slate-700 gap-4 p-5 border border-gray-300 rounded-md w-80 mx-auto"
    >
      <div>
        <h2 className="text-white text-2xl font-bold">Change Password </h2>
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
          placeholder="Enter old Password"
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
          placeholder="Enter new Password"
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

      {/* <button onClick={handleSubmit} className="p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Submit</button> */}

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

export default ChangePasswordCom;
