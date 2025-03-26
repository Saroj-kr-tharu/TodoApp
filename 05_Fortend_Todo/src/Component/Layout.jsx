


import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";


const Layout = () => {
  return (
    <div className="bg-slate-800  overflow-x-hidden w-screen h-screen ">
      <NavBar />

      <Outlet />


    </div>
  );
};

export default Layout;
