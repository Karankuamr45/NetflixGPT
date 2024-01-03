import {checkValidData} from "../utils/validate";
import Header from "./Header"
import {useRef, useState} from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged, updateProfile  } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login=()=>{
  const navigate=useNavigate();

   const [isSignInForm,setIsSignInForm]= useState(true);
   const [errorMessage,setErrorMessage]=useState(null)

   const dispatch=useDispatch();

   const name=useRef(null);
   const email=useRef(null);
   const password=useRef(null);

   const handlebuttonClick=()=>{
   
    // validate the form data
  const message= checkValidData(email.current.value,password.current.value,name);
  setErrorMessage(message)
  if(message) return;

  // Sign In SignUp form

  if(!isSignInForm){
    //  Sign UP Logic
    createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }).then(() => {
      // Profile updated!
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));


      navigate('/browse')
    }).catch((error) => {
      // An error occurred
      setErrorMessage(error.message)
      // ...
    });
    
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
    // ..
  });

  }
  else{
    // Sign In Logic
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate('/browse')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });

  }
    

   }

    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm)

    }

    return(
        <div className="">
            <Header/>
          <div>
          <div className=" hidden sm:block sm:absolute w-full ">
                <img className="sm:h-screen w-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
            </div>

          <div className="flex justify-center items-center sm:z-50 bg-black sm:bg-transparent sm:h-screen text-white">
            
          <form onSubmit={(e)=>e.preventDefault()} className="relative top-10 p-12  bg-black sm:z-50  w-full h-auto sm:w-96 sm:bg-opacity-80 ">
          <h1 className="font-bold text-3xl m-2 mb-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {
                  !isSignInForm && <input type="text" ref={name} placeholder="Name" className="p-4 m-2 w-full rounded-sm bg-gray-800 outline-none" />
                }

                <input type="text" ref={email} placeholder="Email Address" className="p-4 m-2 w-full rounded-sm bg-gray-800 outline-none" />


                <input type="password" ref={password} placeholder="Password" className="p-4 m-2 w-full rounded-sm bg-gray-800 outline-none" />

                <p className="text-red-500 font-bold text-lg">{errorMessage}</p>

                <button className="p-4 m-2 mt-8 bg-red-600 w-full rounded-sm" onClick={handlebuttonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up Now" : "Already regstered? Sign In Now."}</p>
            </form>
          </div>
          </div>

           </div>
    )
}

export default Login