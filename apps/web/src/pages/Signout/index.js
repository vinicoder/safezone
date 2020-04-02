import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signOut } from 'store/modules/auth/actions';

function Signout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
  }, []);
  return <Redirect to="/" />;
}

export default Signout;
