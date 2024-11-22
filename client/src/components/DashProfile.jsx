import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetState } from "../redux/user/userSlice";

function DashProfile() {
  const { currentuser } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    email: currentuser?.email || "", // Default to empty string if email is not available
    password: password,
  });

  // Ensure that data state is updated whenever password changes
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      password: password, // Always update password when it changes
    }));
  }, [password]); // Only run when password changes

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Check if email and password are both set before submitting
    if (!data.email || !data.password) {
      return alert("Email and password are required.");
    }

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Send the email and updated password
      });

      const result = await res.json();

      if (res.ok) {
        // Handle success
        alert("Password updated successfully.");
      } else {
        // Handle failure
        alert(result.message || "Error updating password.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("There was an error updating the password.");
    }
  };


  //handle account delete
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
        const res = await fetch('/api/auth/delete', {
            method: 'DELETE', // Ensure DELETE method is used
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentuser.email }), // Send the current user's email
        });

        const data = await res.json(); // Parse the response

        if (res.ok) {
            alert("Account deleted successfully.");
            dispatch(resetState());

            // Optionally reset the state or redirect the user after deletion
            // Example: redirect to the home page or logout user
            // window.location.href = '/home'; // or use a routing library to redirect
        } else {
            alert(data.message || "Failed to delete account.");
        }
    } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting the account. Please try again.");
    }
};

  //handle sign out

  const dispatch=useDispatch()

  const handleSignOut=async()=>{
    dispatch(resetState())

  }

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
          {currentuser.username}
        </div>
      </div>

      {/* Additional email Information */}
      <div className="text-lg font-medium text-center text-gray-800 mb-4">
        <div className="border-2 border-blue-500 p-3 rounded-md text-blue-700">
          {currentuser.email}
        </div>
      </div>

      {/* Password update form */}
      <form onSubmit={handlePasswordUpdate}>
        <div className="text-lg font-medium text-center text-gray-800 mb-4">
          <input
            type="password"
            className="border-2 border-blue-500 p-3 rounded-md text-blue-700"
            placeholder="Enter new password"
            value={password} // Bind password state to the input
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
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
      <button onClick={handleDeleteAccount} >Delete account</button>
      <button onClick={handleSignOut}>Sign Out</button>
      </div>
     
    </div>
 
    
    </div>
  );
}

export default DashProfile;
