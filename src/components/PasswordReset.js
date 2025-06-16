import React, { useState,useEffect} from "react";
import styled from "styled-components";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {  useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
   const [isVisible, setIsVisible] = useState(true); 
   const location = useLocation();  
  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Please enter your email address!");
      return false;
    }

    const auth = getAuth();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (errorCode === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current Path:", location.pathname);
    if (location.pathname === '/PasswordReset' || loading) {
      
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location.pathname, loading]);
  
  return ( 
<>    {isVisible && <Header />} 
    <Container>
      <Card>
      <ToastContainer />
        <Title>Forgot Password</Title>
        <Description>
          Enter your email address, and we'll send you a link to reset your password.
        </Description>
        <InputWrapper>
          <Label>Email Address</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </InputWrapper>
        <Button onClick={handlePasswordReset} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        <FooterText>
          Remembered your password?{" "}
          <LoginLink href="/login">Go back to Login</LoginLink>
        </FooterText>
      </Card>
    </Container>
    </>

  );
};



const Container = styled.div`
  position: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/images/login-background.jpg") no-repeat center center/cover;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  z-index: -1;
`;

const Card = styled.div`
 
  padding: 6rem;
  box-shadow: -9px 9px 9px rgba(0, 0, 0, 264);
  border-radius: 21px;
  position: relative;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color:rgb(231, 231, 231);
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 14px;
  color:rgb(255, 255, 255);
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  text-align: left;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color:rgb(255, 255, 255);
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0063e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: ${(props) => (props.disabled ? "#c4b5fd" : "#0063e5")};
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background: ${(props) => (props.disabled ? "#c4b5fd" : "#0483ee")};
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-top: 24px;
`;

const LoginLink = styled.a`
  color: #0063e5;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export default ForgotPassword;