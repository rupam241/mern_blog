import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase"; // Adjust the path if `firebase.js` is elsewhere
import { useDispatch } from "react-redux";
import { signInSuccess, signInStart, signInFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Oauth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const resultFromGoogle = await signInWithPopup(auth, provider);

    try {
      dispatch(signInStart()); // Start sign-in process and set loading to true

      // Attempt sign-in with Google popup
     

      

      // Send the user data to your API
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photoURL: resultFromGoogle.user.photoURL,

        }),
      });

      if (res.ok) {
        const data = await res.json(); // Parse the JSON response
        dispatch(signInSuccess(data)); // Dispatch the user data to the store
        navigate("/"); // Redirect to home page
      } 
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      dispatch(signInFailure(error.message)); // Handle any sign-in error
    }
  };

  return (
    <button
      type="button"
      className="px-2 py-1 bg-transparent rounded-lg text-lg flex items-center justify-center border hover:bg-gradient-to-t from-pink-500 to-orange-400"
      onClick={handleGoogleClick}
    >
      Sign In with Google
    </button>
  );
}

export default Oauth;
