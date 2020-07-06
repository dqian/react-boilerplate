import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { getJson } from 'app/utils/rest';

interface IProps extends RouteComponentProps<void> {}

export const App = (props: IProps) => {
  useEffect(() => {
    const helloWorld = async () => {
      const response = await getJson('/');
      console.log(response);
    };
    helloWorld();
  })
  return (
    <div>
      
    </div>
  );
};
