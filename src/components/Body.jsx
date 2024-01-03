import { onAuthStateChanged } from "firebase/auth"
import Browse from "./Browse"
import Login from "./Login"
import {createBrowserRouter, useNavigate} from 'react-router-dom'
import { RouterProvider } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import  {addUser, removeUser } from '../utils/userSlice'
import { auth } from "../utils/firebase"

const Body = () => {

  const dispatch=useDispatch();
  

  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/browse",
      element:<Browse/>
    },
  ])

 useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const {uid,email,displayName,photoURL} = user;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
      

      

      // ...
    } else {
      // User is signed out
     dispatch(removeUser());
     
    }
  });

 },[])


  return (
    <div>
    <RouterProvider  router={appRouter} />
    </div>
  )
}

export default Body
