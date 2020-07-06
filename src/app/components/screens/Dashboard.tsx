import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'app/redux/modules/user';

export const Dashboard: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      Dashboard

      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
};
