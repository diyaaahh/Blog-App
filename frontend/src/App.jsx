import React from 'react';
import { AuthProvider } from './contexts/authContexts';
import AppRouter from './components/routes/AppRouter';

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;