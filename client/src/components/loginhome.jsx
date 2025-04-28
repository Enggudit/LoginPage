import React from 'react'
import LoginHomeNav from './loginhomenav'
import {Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";


function loginhome() {

  const {user, isAuthenticated} = useSelector( (state) => state.auth);

  if(!isAuthenticated) {
    return <Navigate to={"/"} />
  }
    

  return (  
    <div className='bg-zinc-500 w-sceen h-screen'>
      <LoginHomeNav/>
        <div className=''>
            <h1 className='text-3xl text-white font-bold'>Welcome to the Login Home Page</h1>
        </div>
    </div> 
  )
}

export default loginhome
