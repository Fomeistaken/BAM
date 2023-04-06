import React, { useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { useState } from "react";

function Navbar() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();
  const usercheck = useUser();
  async function signOut() {
    await  supabase.auth.signOut();
    navigate("/");
  }
  function signIn() {
    navigate("/login");
  }
  const [showDiv, setShowDiv] = useState(false);
  
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
 

  return (
    <>
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                id="mobile-menu-button"
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={toggleDiv}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/home" className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-extrabold text-center text-white">
                  BAM!
                </h1>
              </Link>
              <div className="hidden sm:block sm:ml-6">
                {!isMobile && (
                  <div className="flex space-x-4">
                    <Link
                      to="/home"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Home
                    </Link>
                    <Link
                      to="/courses"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
                    >
                      Courses
                    </Link>
                    <Link
                      to="/about"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
                    >
                      About Us
                    </Link>
                    <Link
                      to="/home"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
                    >
                      Contact
                    </Link>
                    {usercheck !== null ? (
                      <button
                        onClick={() => signOut()}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
                      >
                        Log Out
                      </button>
                    ) : (
                      <button
                        onClick={() => signIn()}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
                      >
                        Log In
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
       {!isMobile &&( <Link to='/profile' className="absolute top-0 right-0 p-4 m-auto text-xl text-white mx-6 font-bold text-center">
     {usercheck?.user_metadata?.full_name}
    </Link>)}
        {isMobile && (
          <div
            className={`absolute w-full bg-gray-900 sm:hidden ${showDiv ? "block" : "hidden"}`}
            id="mobile-menu"
          >

            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to='/profile' className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                {usercheck?.user_metadata?.full_name}
              </Link>
              <Link
                to="/home"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
              >
                About Us
              </Link>
              <Link
                to="/home"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 "
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
