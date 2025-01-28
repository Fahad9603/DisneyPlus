import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../features/user/UserSliec'; // Corrected Slice Name
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // State to control Header visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const validateInput = () => {
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      const userDocRef = doc(db, 'customers', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        dispatch(
          setUserLogin({
            uid: user.uid,
            displayName: userData.displayName || user.displayName,
            email: user.email,
            img: userData.photoURL,
          })
        );

        toast.success('Sign-in successful!');
        navigate('/home');
      } else {
        toast.error('User data not found. Please contact support.');
      }
    } catch (err) {
      if (err.code === 'auth/user-not-found' || 'auth/invalid-credential') {
        toast.error('User not found. Please check your email.');
      } else if (err.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
      } else {
        console.log(err)
        toast.error('Something went wrong. Please try again later.');
      }
    }
    setLoading(false);
  };

  const handleSignupClick = () => {
    setIsVisible(false); // Set isVisible to false to hide the Header
  };

  return (
    <Container>
      <Main>
        <ToastContainer />
        <Title>Sign In</Title>
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
          <SignupLink to="/PasswordReset" onClick={handleSignupClick}>ForgotPassword</SignupLink>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
        </Form>
        <SignupLink to="/signup" onClick={handleSignupClick}>New User? Sign Up Here</SignupLink>


        {isVisible && <Header />}
      </Main>
    </Container>
  );
};

// Styled Components
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
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div``;

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

const SignupLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default SignIn;
