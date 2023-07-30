import React, { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "../utils/firebase-config";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({email: "", password:""})

  const navigate = useNavigate()

  const handleSignIn = async()=>{
     try {
         const{email, password} = formValues;
         await createUserWithEmailAndPassword(firebaseAuth, email,password)
     } catch (error) {
          console.log(error)
     }
  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser)navigate('/')
  })

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Unlimited movies, Tv shows and more</h1>
            <h4>watch anywhere, Cancel Anytime</h4>
            <h6>
              Ready to watch? Enter your email to create menbership
            </h6>
          </div>
          <div className="form">
            {showPassword ? (
              <input type="password" placeholder="password" name="password"
              value={formValues.password}
              onChange={(e)=>setFormValues({
                ...formValues,[e.target.name]: e.target.value
              })}
              />
            ) : (
              <input type="email" placeholder="email address" name="email"
              value={formValues.email}
              onChange={(e)=>setFormValues({
                ...formValues,[e.target.name]: e.target.value
              })}
              />
            )}

            {
              !showPassword ? (
                <button onClick={()=>setShowPassword(true)}>Get Started</button>
              ): <button onClick={handleSignIn}>Sign Up</button>
            }

           
           
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.79);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 5rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 2rem;
      color: white;
      padding: 1rem;
    }
    h1 {
      padding: 0 25rem;
    }
    h4 {
   
    }
    h6 {
     
    }
  }
  .form {
    display: grid;
    width: 60%;
    grid-template-columns: ${({showPassword})=>showPassword? "1fr 1fr" : "2fr 1fr"};
    input {
      color: black;
      padding: 1.5rem;
      font-size: 1.2rem;
      width: 45rem;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: red;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 1.05rem;
      width: 10rem;
      font-weight:bolder
    }
  }
  @media (max-width: 768px) {
    .content {
      grid-template-columns: 1fr; /* Switch to a single column layout */
      justify-items: center;
    }

    .form {
      width: 90%; /* Adjust the width for smaller screens */
      grid-template-columns: 1fr; /* Switch to a single column layout */
      gap: 1rem; /* Add some gap between form elements */
      
      input {
        width: 100%; /* Make input fields occupy full width */
      }
    }

    .text {
      font-size: 1.5rem; /* Decrease font size for smaller screens */
      padding: 0.5rem; /* Adjust padding for smaller screens */
    }
    
    h1 {
      padding: 0; /* Remove padding for smaller screens */
      font-size:25px;
    }
    
    h4 {
      /* Additional styles for h4 heading on smaller screens */
      font-size:20px;
    }
    
    h6 {
      /* Additional styles for h6 heading on smaller screens */
      font-size:15px;
    }
  }
`;

export default SignUpPage;
