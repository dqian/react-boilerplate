import React from 'react';
import { RouteComponentProps } from 'react-router';
import { AppRoute } from 'app/services/constants';
import { Link } from 'react-router-dom';

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      Home (not logged in)

      <div>
        <Link to={AppRoute.Login}>Login</Link>
      </div>
      <div>
        <Link to={AppRoute.Register}>Register</Link>
      </div>
    </div>
  );
};
