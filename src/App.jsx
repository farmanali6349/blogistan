import './App.css'
import { Outlet } from "react-router-dom"
import { login, logout } from './store/slices/authSlice'
import { addAuthors, addAuthor } from "./store/slices/authorsSlice"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { authService } from "./services/authService"
import { Header } from './components/index';
import { databaseService } from './services/databaseService'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))

          if(userData) {
            databaseService.getAuthors()
              .then((authors) => {
                dispatch(addAuthors(authors.documents));

                if(authors) {
                  const author = userData && authors.documents ? authors.documents.filter((author) => userData.$id === author.$id)[0] : null;
                  dispatch(addAuthor(author))
                }
              })
              .catch((err)=> console.log("Can't Get Authors : ", err))
          }
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
