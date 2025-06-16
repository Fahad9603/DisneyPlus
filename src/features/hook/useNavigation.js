import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSignOut } from '../user/UserSliec';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorEl(null);
  };

  const signoutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(setSignOut());
      navigate('/');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return {
    anchorEl,
    setAnchorEl,
    handleOpenNavMenu,
    handleCloseNavMenu,
    user,
    signoutHandler,
  };
};

export default useNavigation;
