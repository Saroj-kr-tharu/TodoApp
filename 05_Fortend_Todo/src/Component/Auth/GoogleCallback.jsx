import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { checkBodyTokenAction, clearError } from "../../redux/slice/authenticationSlice";
import toast, { Toaster } from "react-hot-toast";

function GoogleCallback() {
  const parameter = useParams();
  const email = parameter?.data;


  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const getError = useSelector((state) => state.authenticationReducer.error);
  const getStatus = useSelector((state) => state.authenticationReducer.status); 

  useEffect(() => {
    console.log('call back ', email);
      toast.success("Successfully Login With Gmail ");
    dispatch(checkBodyTokenAction(email));
  }, [dispatch,email]);


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

  }, [getStatus, getError]);


  return (
    <div>
     <Toaster position="bottom-left" reverseOrder={false}  />
      Successfully Login process done 
      <br />
    </div>
  );
}

export default GoogleCallback;
