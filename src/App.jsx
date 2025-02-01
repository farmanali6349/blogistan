import "./App.css";
import { Outlet } from "react-router";
import { Navbar, Footer } from "./components";
import { useEffect, useState } from "react";
import authService from "./services/auth";
import { useDispatch, useSelector } from "react-redux";
import { login as localLogin, logout } from "./store/features/authSlice";
import databaseService from "./services/database";
import { setCurrentAuthor } from "./store/features/authorsSlice";
import { images } from "./assets/images";
import useOnlineStatus from "./hooks/useOnlineStatus";
function App() {
  const isOnline = useOnlineStatus();
  const dispatch = useDispatch();
  const [scrollValue, setScrollValue] = useState(0);
  const [categories, setCategories] = useState([]);
  window.addEventListener("scroll", () => {
    setScrollValue(window.scrollY);
  });

  const userData = useSelector((state) => state.AuthReducer.userData);
  const currAuthor = useSelector((state) => state.AuthorsReducer.currentAuthor);

  async function updateAuthStatus() {
    const user = await authService.getCurrentUser();

    if (user) {
      dispatch(localLogin(user));

      const author = await databaseService.getAuthor({ $id: user.$id });
      if (author) {
        dispatch(setCurrentAuthor(author));
      }
    } else {
      dispatch(logout());
    }
  }

  useEffect(() => {
    if (!userData) {
      updateAuthStatus();
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (userData && currAuthor) {
      dispatch(setCurrentAuthor(currAuthor));
    }
  }, [userData, currAuthor]);

  async function loadCategories() {
    const reponse = await databaseService.getCategories();
    const cats = [...reponse.documents];
    const categoriesWithBlogs = cats?.filter((cat) => cat.blogs.length > 0);
    setCategories(categoriesWithBlogs);
  }
  return (
    <>
      {!isOnline && (
        <div className={`connectivity ${scrollY > 10 ? "fixed" : ""}`}>
          <img src={images.offline} alt="offline" />
          <span>
            You are Offline. Please Connect To Internet For Better Experience
          </span>
        </div>
      )}
      <Navbar categories={categories} />
      <Outlet />
      <Footer categories={categories} />
    </>
  );
}

export default App;
