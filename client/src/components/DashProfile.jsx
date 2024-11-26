import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetState } from "../redux/user/userSlice";

function DashProfile() {

  const {currentuser}=useSelector((state)=>state.user)

  return (
    <div>
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-80 mx-auto md:ml-4">
      {/* Display Profile Header */}
      <div className="text-2xl font-semibold text-gray-700 mb-6">Profile</div>

      {/* User profile picture */}
      <div className="w-32 h-32 mb-6">
        <img
          src={currentuser.profilePicture}
          alt="User Profile"
          className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-md"
        />
       
        
      </div>
     

   
      {/* Username Display */}
      <div className="text-lg font-medium text-center text-gray-800 mb-4">
        <div className="border-2 border-blue-500 p-3 rounded-md text-blue-700">
        { currentuser.username}
        </div>
      </div>

      {/* Additional email Information */}
      <div className="text-lg font-medium text-center text-gray-800 mb-4">
        <div className="border-2 border-blue-500 p-3 rounded-md text-blue-700">
     { currentuser.email}
        </div>
      </div>

      {/* Password update form */}
      <form >
        <div className="text-lg font-medium text-center text-gray-800 mb-4">
          <input
            type="password"
            className="border-2 border-blue-500 p-3 rounded-md text-blue-700"
            placeholder="Enter new password"
             // Bind password state to the input
         //Update password state on change
          />
          <button
            type="submit"
            className="mt-2 border-2 border-blue-500 px-8 rounded-lg hover:bg-orange-400"
          >
            Update
          </button>
        </div>
      </form>
      <div  className="flex justify-between items-center gap-20 text-red-500">
      <button  >Delete account</button>
      <button >Sign Out</button>
      </div>
     
    </div>
 
    
    </div>
  );
}

export default DashProfile;
