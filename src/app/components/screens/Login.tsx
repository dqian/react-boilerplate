import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { reduxForm, InjectedFormProps, Field, FormErrors } from 'redux-form';
import { ReduxFormName, AppRoute } from 'app/services/constants';
import ReduxFormInput from '../form/ReduxFormInput';
import { useDispatch } from 'react-redux';
import { loginUser } from 'app/redux/modules/user';

export interface ILoginFormValues {
  email?: string;
  password?: string;
}

const validateLoginForm = (values: ILoginFormValues): FormErrors<ILoginFormValues> => {
  const errors: FormErrors<ILoginFormValues> = {};

  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  // TODO: validate email format

  return errors;
};

export interface ILoginFormProps {
  isLoggingIn: boolean;
  loginError?: string;
}

export const LoginForm: React.FC<ILoginFormProps & InjectedFormProps<{}, ILoginFormProps>> = (props: any) => {
  const { handleSubmit, isLoggingIn, loginError } = props;
  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <div>
        <Field
          name="email"
          type="text"
          component={ReduxFormInput}
          label="Email"
          placeHolder="Email Address"
        />
      </div>
      <div>
        <Field
          name="password"
          type="password"
          component={ReduxFormInput}
          label="Password"
          placeHolder="Password"
        />
      </div>
            
      <div>
        <button
          type="submit"
          disabled={isLoggingIn}
        >
          Log In
        </button>
      </div>

      {loginError && 
        <div>{loginError}</div>
      }
    </form>
  );
}

const Form = reduxForm<{}, ILoginFormProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: ReduxFormName.Login,
  validate: validateLoginForm,
})(LoginForm);

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  const onSubmit = (values: ILoginFormValues) => {
    setIsLoggingIn(true);
    dispatch(
      loginUser(
        values, 
        {
          success: () => {
            setIsLoggingIn(false);
            history.push(AppRoute.Root);
          },
          error: (error: Error) => {
            setLoginError(error.message || "Failed to log in.");
          },
          finally: () => {
            setIsLoggingIn(false);
          }
        }
      )
    )
  };

  return (
    <div>
      Login
      <Form onSubmit={onSubmit} isLoggingIn={isLoggingIn} loginError={loginError} />
    </div>
  );
};
