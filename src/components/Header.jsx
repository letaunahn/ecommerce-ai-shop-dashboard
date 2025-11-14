import { Menu } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../store/slices/extraSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { openedComponent } = useSelector((state) => state.extra);
  const dispatch = useDispatch();
  return (
    <>
      <header className="flex justify-between mb-3 pb-2">
        <p className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">{user?.name}</span>
          <span>/</span>
          <span>{openedComponent}</span>
        </p>
        <div className="flex gap-3 items-center">
          <Menu className="block md:hidden cursor-pointer" onClick={() => dispatch(toggleNavbar())}/>
          <img src={user?.avatar?.url} alt={user?.name}  className="w-14 h-14 rounded-full object-cover"/>
        </div>
      </header>
    </>
  );
};

export default Header;
