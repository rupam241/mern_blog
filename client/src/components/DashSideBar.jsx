import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from '../redux/user/userSlice';

function DashSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.ok) {
        console.log("logout successful");
        dispatch(resetState());
        navigate('/signin');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center md:items-start">
      {/* Profile Button */}
      <div className="bg-slate-100 px-4 py-2 rounded-md w-40 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-200 md:items-start">
        <div className="flex items-center gap-2">
          <CgProfile />
          <span>Profile</span>
        </div>
        <span className="bg-slate-400 text-white px-2 py-0.5 rounded-md text-sm">
          User
        </span>
      </div>

      {/* Sign Out Button */}
      <div
        className="px-4 py-2 rounded-md w-40 flex gap-2 items-center cursor-pointer hover:bg-slate-200 md:justify-start"
        onClick={handleSignOutClick}
      >
        <FaLongArrowAltRight />
        Sign Out
      </div>
    </div>
  );
}

export default DashSideBar;
