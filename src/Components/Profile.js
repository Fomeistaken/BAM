import React from 'react';
import { useUser } from "@supabase/auth-helpers-react";
import Error from './Error';
import { Link } from 'react-router-dom';

function Profile() {
  const user = useUser();
  const lasttimestamp = user?.identities[0]?.last_sign_in_at;
  const createtimestamp = user?.identities[0]?.created_at;
  const date = new Date(lasttimestamp);
  const createdate = new Date(createtimestamp);
  const humanReadableTime = date.toLocaleString();
  const humanReadableTimeupdate = createdate.toLocaleString();

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center justify-center bg-gray-100 h-64">
              {user.user_metadata.avatar_url ? (
                <img
                  className="object-cover object-center h-full w-full object-contain"
                  src={user.user_metadata.picture}
                  alt="Profile picture"
                  referrerpolicy="no-referrer"
                />
              ) : (
                <svg
                  className="h-20 w-20 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </div>
            <div className="py-5 px-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {user.user_metadata.full_name}
              </h1>
              <p className="mt-2 text-gray-600">
                {user.email}
              </p>
              <p className="mt-2 text-gray-600">
                Last signed in: {humanReadableTime}
              </p>
              <p className="mt-2 text-gray-600">
                Account created: {humanReadableTimeupdate}
              </p>
            </div>
          </div>
        </div>
      ):   <div class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        User Not Logged In
      </div>
      <button class="mt-5">
          <a
            class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span
              class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>
    
            <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to="/">Log In</Link>
            </span>
          </a>
        </button>
    </div>}
    </>
  );
}

export default Profile;
