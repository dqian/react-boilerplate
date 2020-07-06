import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'app/redux/modules/user';
import { selectLoggedInUser } from 'app/redux/selectors/user';

export const Dashboard: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const onClickLogout = () => {
    dispatch(logoutUser());
  };
  
  return (
    <div>
      Dashboard
      <div>
        {user && `(logged in as ${user.email})`}
      </div>

      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
};
