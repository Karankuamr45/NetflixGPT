const checkValidData=(email,password,name)=>{
  
  const isNameValid=/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name)
  const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  
  if(!isEmailValid) return "Email ID is not Valid";
  if(!isPasswordValid) return "Password is not Valid";
  if(!isNameValid) return "Name is not Valid";

  return null;
}

export  {checkValidData};