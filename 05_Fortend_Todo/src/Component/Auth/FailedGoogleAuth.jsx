import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/slice/authenticationSlice";

function FailedGoogleAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearError());
      navigate("/");
    }, 3000);
  }, [navigate]);
  return <div>FailedGoogleAuth</div>;
}

export default FailedGoogleAuth;
