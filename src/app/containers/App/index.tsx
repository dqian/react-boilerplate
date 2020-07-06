import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router';
import PrivateRoute from 'app/components/PrivateRoute';
import { AppRoute } from 'app/services/constants';
import { Login } from 'app/components/screens/Login';
import { Register } from 'app/components/screens/Register';
import { Home } from 'app/components/screens/Home';
import { Dashboard } from 'app/components/screens/Dashboard';
import { hasJwtToken, getJwtToken } from 'app/services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { verifyJwtAuthentication, logoutUser } from 'app/redux/modules/user';
import { selectIsUserLoggedIn } from 'app/redux/selectors/user';

interface IProps extends RouteComponentProps<void> {}

export const App: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  if (!hasJwtToken()) {
    if (isUserLoggedIn) {
      dispatch(logoutUser());
    }
  } else {
    dispatch(verifyJwtAuthentication(getJwtToken()!))
  }

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
