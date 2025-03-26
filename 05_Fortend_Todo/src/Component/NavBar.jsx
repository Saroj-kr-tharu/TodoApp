import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

import {
  logOutUser,
  clearError,
  setUser,
  checkTokenAction,
} from "../redux/slice/authenticationSlice";
import ProfileMenu from "./Auth/UserProfileComponent";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      dispatch(checkTokenAction({ token: user.token }));
      dispatch(setUser(user));
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentUser =
    useSelector((state) => state.authenticationReducer.curUser) || {};
  const email = currentUser?.email;
  const isLogin = currentUser?.isLogin;
  const verified = currentUser?.verified;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logOutUser());
    setIsMenuOpen(false);
    navigate("/login");
    toast.success("Successfully logged out");
  };

  const handleChangePassword = () => {
    if (isLogin) {
      dispatch(clearError());
      navigate("/changepassword");
    } else {
      toast.error("You have to Login First");
    }
  };

  const handleVerify = () => {
    if (!verified) {
      dispatch(clearError());
      navigate("/verification");
    }
  };

  const handleForgetPassword = () => {
    if (isLogin) {
      dispatch(clearError());
      navigate("/forgetpassword");
    } else {
      toast.error("You have to Login First");
    }
  };

  return (
    <nav className="sticky z-20 top-0 flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      {/* Left side: Logo */}
      <h2
        className="text-xl font-bold hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Logo
      </h2>

      {/* Right side: User Icon */}
      {isLogin ? (
        <div className="relative" ref={menuRef} title="User Profile">
          <span>
            <FaUserCircle
              onClick={handleMenuClick}
              className="cursor-pointer text-2xl"
            />
          </span>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-100">
              {isLogin ? (
                <>
                  <ProfileMenu
                    email={email}
                    onLogout={handleLogout}
                    onChangePassword={handleChangePassword}
                    onForgetPassword={handleForgetPassword}
                    onVerify={handleVerify}
                    verified={verified}
                  />
                </>
              ) : (
                <div
                  className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate("/login")}
                >
                  Login
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          className="px-6 py-3 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md cursor-pointer hover:bg-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95"
          onClick={() => navigate("/login")}
        >
          Login
        </div>
      )}
    </nav>
  );
};

export default NavBar;
