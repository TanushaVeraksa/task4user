import React, {useContext, useEffect, useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from 'mobx-react-lite'
import {Context} from './index'
import { check } from './http/userAPI';

const App = observer(() => {
  const {user} = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(()=> {
      user.setUser(true)
      user.setIsAuth(true)
  }, [])

  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter />
    </BrowserRouter>
  );
})

export default App;