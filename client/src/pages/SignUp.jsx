import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/*left side */}
          <div className="flex-1">
            <Link
              to=""
              className="   font-bold dark:text-white text-4xl"
            >
              <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Rupam's
              </span>
              <span className=" text-gray-500 text-md">Blog</span>
            </Link>
            <p className="text-sm mt-5">If you want to read the article please signup with you email and password
              or with Google.
            </p>
          </div>

          {/*right side */}
          <div className="flex-1">
            <form className="flex flex-col gap-4 text-xl">
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" id="username" className="w-full p-2 pr-10 rounded border border-gray-500 outline-0" />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="name@gmail.com" id="email"  className="w-full p-2 pr-10 rounded border border-gray-500 outline-0" />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password"  className="w-full p-2 pr-10 rounded border border-gray-500 outline-0" />
              </div>

              <button type="submit" className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-lg">Sign Up</button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account? </span>
              <Link to="/signin" className="text-blue-500">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
