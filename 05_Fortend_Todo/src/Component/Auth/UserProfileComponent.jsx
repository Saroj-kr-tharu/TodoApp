import React, { useState } from "react";
import { FaKey, FaLock, FaUnlock, FaSignOutAlt, FaCheck } from "react-icons/fa";

const ProfileMenu = ({
  email,
  onLogout,
  onChangePassword,
  onForgetPassword,
  onVerify,
  verified,
}) => {
  const initial = email ? email[0].toUpperCase() : "U";

  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="absolute right-0 z-100  w-60  bg-white rounded-lg shadow-xl border-2 border-gray-700 -mt-2">
      {/* Header Section */}
      <div className="p-4 bg-blue-600 rounded-t-lg text-white">
        <div className="text-sm mb-2">Current User</div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-xl font-semibold">
            {initial}
          </div>
          <div>
            <div className="font-medium">User Profile</div>
            <div className="text-sm text-blue-100">{email}</div>
          </div>
        </div>
        <div className="flex gap-4">
          {verified && (
            <div className="flex  justify-center items-center gap-2">
              <div
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
                onClick={onVerify}
              >
                <FaCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-900 font-bold">Verified Account</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-slate-300 text-gray-700">
        <div
          className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 hover:bg-slate-800 hover:text-white ${
            activeItem === "changePassword" ? "bg-slate-500 text-white" : ""
          }`}
          onClick={() => {
            onChangePassword();
            handleItemClick("changePassword");
          }}
        >
          <FaLock className="w-4 h-4" />
          Change Password
        </div>

        {!verified && (
          <div
            className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 hover:bg-slate-800 hover:text-white ${
              activeItem === "verifyAccount" ? "bg-slate-500 text-white" : ""
            }`}
            onClick={() => {
              onVerify();
              handleItemClick("verifyAccount");
            }}
          >
            <FaCheck className="w-4 h-4" />
            Verify Account
          </div>
        )}

        <div
          className={`px-4 py-2 text-sm cursor-pointer flex items-center gap-2 hover:bg-slate-800 hover:text-white ${
            activeItem === "forgetPassword" ? "bg-slate-500 text-white" : ""
          }`}
          onClick={() => {
            onForgetPassword();
            handleItemClick("forgetPassword");
          }}
        >
          <FaUnlock className="w-4 h-4" />
          Forget Password
        </div>

        <div
          className={`px-4 py-2 text-sm  cursor-pointer flex items-center gap-2 hover:bg-slate-800 hover:text-white ${
            activeItem === "logout" ? "bg-slate-500 text-white" : ""
          }`}
          onClick={() => {
            onLogout();
            handleItemClick("logout");
          }}
        >
          <FaSignOutAlt className="w-4 h-4" />
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
