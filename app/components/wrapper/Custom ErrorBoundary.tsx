import ErrorBoundary from 'react-native-error-boundary';

import React from 'react';
import ErrorScreen from './ErrorScreen';

type Props = {
  children: React.ReactNode;
};

export default function CustomErrorBoundary({ children }: Props) {
  const errorHandler = (error: Error, stackTrace: string) => {
    /* Log the error to an error reporting service */
    console.error('App Error >>>', error, stackTrace);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen} onError={errorHandler}>
      {children}
    </ErrorBoundary>
  );
}
