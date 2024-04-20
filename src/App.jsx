import './App.css'
import { Outlet } from "react-router-dom"
import { login, logout } from './store/slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { authService } from "./services/authService"

function App() {

  const dispatch = useDispatch();

  useEffect(()=> {
    authService.getCurrentUser()
      .then((userData) => dispatch(login(userData)))
      .catch((err)=> dispatch(logout()))
  
  }, [])
  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />

        <div className="test-elements">
          <button onClick={() => loginUser()}>Login</button>
          <button onClick={() => logoutUser()}>Logout</button>
        </div>
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
