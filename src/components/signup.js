import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserLogin } from '../features/user/UserSliec';
import {useLoader} from '../features/Loader/hooks/useLoader'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true); 
  const { showLoader, hideLoader } = useLoader();
  const handleSignup = (email, password) => {
    const auth = getAuth();
    showLoader()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUserLogin({
          name: user.displayName || 'Default Name',  
          email: user.email,
          photo: user.photoURL || '',  
          uid: user.uid
        }));
        toast.info("User signed up:", user);
        navigate("/Plan-Selection");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email is already in use");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password is too weak");
        } else {
          toast.error("Error during signup:", error.message);
          console.error("Error during signup:", error.message);
        }
      })
      .finally(() => {
        hideLoader() 
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(email, password); 
  };

  useEffect(() => {
    if (location.pathname === '/signup' || loading) {
      setIsVisible(false); 
    } else {
      setIsVisible(true); 
    }
  }, [location.pathname, loading]);  

  return (
    <>
      {isVisible && <Header />}  

      <Container>
        <Main>
          <ToastContainer />
          <Title>Sign Up</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </SubmitButton>
          </Form>
        </Main>
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

const Main = styled.main`
  max-width: 70%;
  padding: 6rem;
  box-shadow: -9px 9px 9px rgba(0, 0, 0, 264);
  border-radius: 21px;
  position: relative;
  @media (max-width: 768px) {
    max-width: 90%;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1rem;
`;

const Form = styled.form`
  margin-top: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #0063e5;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1.5rem;

  &:hover {
    background-color: #0483ee;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default LoginPage;
