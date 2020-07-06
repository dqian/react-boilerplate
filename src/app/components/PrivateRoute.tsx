import * as React from 'react';
import {Route, Redirect, RouteProps, RouteComponentProps} from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsUserLoggedIn } from 'app/redux/selectors/user';
import { AppRoute } from 'app/services/constants';

interface IProps extends RouteProps {
  redirectComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute: React.FC<IProps> = ({ 
  component: Component, 
  redirectComponent: RedirectComponent, 
  ...rest
}) => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn)
  if (!Component) return null;
  if (isUserLoggedIn) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  if (RedirectComponent) {
    return <Route {...rest} render={props => <RedirectComponent {...props} />} />;
  }
  return <Redirect to={AppRoute.Login} />
}

export default PrivateRoute;
