import React from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';

import MainNavigation from './components/MainNavigation';

const App = () => {
  return(
    <AuthProvider>
      <MainNavigation/>
    </AuthProvider>
  )
}

export default App;
