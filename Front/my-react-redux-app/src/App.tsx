// src/App.tsx

import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>React Redux Auth App</h1>
        <Login /> {/* This is the correction */}
        <Register /> {/* This is the correction */}
      </div>
    </Provider>
  );
};

export default App;
