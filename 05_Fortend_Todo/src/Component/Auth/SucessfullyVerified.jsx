import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearError, setUser } from "../../redux/slice/authenticationSlice";

function SucessVerify() {
  const parameter = useParams();
  const email = parameter?.data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    user.verified = true;
    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user) {
      dispatch(setUser(user)); 
    }
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearError());
      navigate("/");
    }, 3000);
  }, [navigate]);

  return (
    <div>
      Successfully verification process done {email}
      <br />
    </div>
  );
}

export default SucessVerify;
