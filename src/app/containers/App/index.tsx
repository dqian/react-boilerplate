import React, { useEffect } from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router';
import { getJson } from 'app/utils/rest';
import PrivateRoute from 'app/components/PrivateRoute';
import { AppRoute } from 'app/services/constants';
import { Login } from 'app/components/screens/Login';
import { Register } from 'app/components/screens/Register';
import { Home } from 'app/components/screens/Home';
import { Dashboard } from 'app/components/screens/Dashboard';

interface IProps extends RouteComponentProps<void> {}

export const App = (props: IProps) => {
  useEffect(() => {
    const helloWorld = async () => {
      const response = await getJson('/');
      console.log(response);
    };
    helloWorld();
  })

  // if missing jwttoken locally, redirect to login page
  
  // show loading screen and 
  // dispatch authenticate user


  return (
    <div>
      <Switch>
        <Route path={AppRoute.Login} component={Login}/>
        <Route path={AppRoute.Register} component={Register}/>
        <PrivateRoute path={AppRoute.Root} 
          component={Dashboard}
          redirectComponent={Home} 
        />
      </Switch>
    </div>
  );
};
