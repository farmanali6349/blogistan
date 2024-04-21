import './App.css'
import { Outlet } from "react-router-dom"
import { login, logout } from './store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { authService } from "./services/authService"
import { Header } from './components/index';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
      })
      .catch((err) => {
        console.log("No User Data Found");
        dispatch(logout())
      })
  }, [])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
