import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { reduxForm, InjectedFormProps, Field, FormErrors } from 'redux-form';
import { ReduxFormName, AppRoute } from 'app/services/constants';
import ReduxFormInput from '../form/ReduxFormInput';
import { useDispatch } from 'react-redux';
import { registerUser } from 'app/redux/modules/user';

export interface IUserRegistrationFormValues {
  email?: string;
  password?: string;
}

const validateRegistrationForm = (values: IUserRegistrationFormValues): FormErrors<IUserRegistrationFormValues> => {
  const errors: FormErrors<IUserRegistrationFormValues> = {};

  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  // TODO: validate email format

  return errors;
};

export interface IRegistrationFormProps {
  isRegistering: boolean;
  registrationError?: string;
}

export const RegistrationForm: React.FC<IRegistrationFormProps & InjectedFormProps<{}, IRegistrationFormProps>> = (props: any) => {
  const { handleSubmit, isRegistering, registrationError } = props;
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
          disabled={isRegistering}
        >
          Register
        </button>
      </div>

      {registrationError && 
        <div>{registrationError}</div>
      }
    </form>
  );
}

const Form = reduxForm<{}, IRegistrationFormProps>({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  form: ReduxFormName.Register,
  validate: validateRegistrationForm,
})(RegistrationForm);

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<string>("");

  const onSubmit = (values: IUserRegistrationFormValues) => {
    setIsRegistering(true);
    dispatch(
      registerUser(
        values, 
        {
          success: () => {
            setIsRegistering(false);
            history.push(AppRoute.Root);
          },
          error: (error: Error) => {
            setRegistrationError(error.message || "Failed registration.");
          },
          finally: () => {
            setIsRegistering(false);
          }
        }
      )
    )
  };

  return (
    <div>
      Registration
      <Form onSubmit={onSubmit} isRegistering={isRegistering} registrationError={registrationError} />
    </div>
  );
};
