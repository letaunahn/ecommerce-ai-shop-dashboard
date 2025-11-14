import {
  LayoutDashboard,
  ListOrdered,
  LogOut,
  MoveLeft,
  Package,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Navigate } from "react-router-dom";
import { toggleComponent, toggleNavbar } from "../store/slices/extraSlice";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const links = [
    {
      icon: <LayoutDashboard />,
      title: "Dashboard",
    },
    {
      icon: <ListOrdered />,
      title: "Orders",
    },
    {
      icon: <Package />,
      title: "Products",
    },
    {
      icon: <Users />,
      title: "Users",
    },
    {
      icon: <Users />,
      title: "Profile",
    },
  ];

  const { isNavbarOpen } = useSelector((state) => state.extra);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <aside
        className={`${
          isNavbarOpen ? "left-[10px]" : "-left-full"
        } fixed w-64 h-[97.5%] rounded-xl bg-white z-10 mt-[10px] transition-all duration-300 shadow-lg p-4 space-y-4 flex flex-col justify-between md:left-[10px]`}>
        <nav className="space-y-2">
          <div className="flex flex-col gap-2 py-2">
            <h2 className="flex items-center justify-between text-xl font-bold">
              <span>Admin Panel</span>
              <MoveLeft
                className="block md:hidden cursor-pointer"
                onClick={() => dispatch(toggleNavbar())}
              />
            </h2>
            <hr />
          </div>
          {links.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  dispatch(toggleComponent(item.title), setActiveLink(index));
                }}
                className={`${
                  activeLink === index
                    ? "bg-dark-gradient text-white"
                    : "hover:bg-gray-500"
                }  w-full hover:text-white transition-all duration-300 rounded-md cursor-pointer px-3 py-2 flex items-center gap-2`}>
                {item.icon} {item.title}
              </button>
            );
          })}
        </nav>
        <button onClick={handleLogout} className="text-white rounded-md cursor-pointer flex items-center justify-center px-3 py-2 gap-2 bg-red-gradient">
          <LogOut/>Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
