import React, { useEffect } from 'react'
import setTitle from '../setTitle'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { supabase } from '../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@supabase/auth-helpers-react'

function Login() {
  const usercheck = useUser()
    const navigate = useNavigate()
    setTitle('Login')
    supabase.auth.onAuthStateChange(async (event) =>{
        if (event === 'SIGNED_IN') {
            navigate('/home')
        }
        else{
            navigate('/')
        }
    })

    // useEffect(() => {
    
    //   if (usercheck !== null) {
    //     navigate('/home')
    //   }
     
    // }, [usercheck])

  return (
    <>


<div className="flex items-center justify-center h-screen bg-gray-100">
     {usercheck === null ?( <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-medium mb-4">Log in to your account</h1>
        <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  theme="light"
                  providers={["google"]}
                  onlyThirdPartyProviders={true}
                />
      </div>):(
         <div className="bg-white p-8 rounded shadow-md">
         <h1 className="text-2xl text-center font-medium mb-4">You are already logged in!</h1>
         <p className="text-xl text-center text-gray-600">
              
              <Link to="/" className="text-indigo-500 font-medium">
                Home
              </Link>
              
            </p>
       </div>
      )}
    </div>
    </>
    
  )
}

export default Login