import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader';
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from "./index";

function App() {
  const { auth } = React.useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Navigation />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
