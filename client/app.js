import React from 'react';
import Routes from './routes';
import { Navbar } from './components';

const App = () => {
  return (
    <div>
      <div>
        <Navbar />
        <Routes />
      </div>
    </div>
  );
};

export default App;
