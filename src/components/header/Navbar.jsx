import Logo from "./Logo";
import { Button } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import authService from "../../services/auth";
import { logout as localLogout } from "../../store/features/authSlice";
import { unSetCurrentAuthor } from "../../store/features/authorsSlice";
import { useEffect, useState } from "react";
import { navIcon } from "../../assets/images";
import databaseService from "../../services/database";

function Navbar({ categories }) {
  const authStatus = useSelector((state) => state.AuthReducer.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [containerWidth, setContainerWidth] = useState(() => window.innerWidth);
  const [navVisibility, setNavVisibility] = useState(false);

  const navigateToLink = (link) => {
    setNavVisibility(false);
    navigate(link);
  };

  useEffect(() => {
    setNavVisibility(false);
  }, []);

  window.addEventListener("resize", () => {
    setContainerWidth(window.innerWidth);
  });

  async function logoutUser() {
    const deletedSession = await authService.logout();

    if (deletedSession) {
      dispatch(localLogout());
      dispatch(unSetCurrentAuthor());
      navigateToLink("/login");
    }
  }

  const navItems = [
    {
      name: "Create Blog",
      url: "/create-blog",
      active: true,
    },
    {
      name: "Create Categories",
      url: "/create-categories",
      active: authStatus,
    },
    {
      name: "Account",
      url: "/account",
      active: authStatus,
    },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <Logo />

        {containerWidth <= 768 && (
          <img
            className="nav-icon"
            src={navIcon}
            alt="nav-icon"
            onClick={() => setNavVisibility((prev) => !prev)}
          />
        )}
        <div
          className="right"
          style={{
            height: `${
              containerWidth < 768 ? `${root.offsetHeight}px` : "auto"
            }`,
            right: `${!navVisibility ? "-250" : "0"}px`,
            display: `${
              containerWidth < 768
                ? `${navVisibility ? "flex" : "none"}`
                : "flex"
            }`,
          }}
        >
          <ul className="nav-items">
            <li className="categories-nav-item">
              Categories
              <ul>
                {categories?.map((cat) => {
                  return (
                    <li
                      key={cat?.$id}
                      onClick={() => navigateToLink(`/category/${cat?.$id}`)}
                    >
                      {cat?.name}
                    </li>
                  );
                })}
              </ul>
            </li>
            {navItems.map((item) => {
              if (item.active) {
                return (
                  <li key={item.url} onClick={() => navigateToLink(item.url)}>
                    {item.name}
                  </li>
                );
              }
            })}
          </ul>

          <div className="buttons">
            {!authStatus && (
              <>
                <Button
                  text={"Login"}
                  classes={"secondary"}
                  onClick={() => navigateToLink("/login")}
                />
                <Button
                  text={"Sign Up"}
                  classes={"primary"}
                  onClick={() => navigateToLink("/signup")}
                />
              </>
            )}
            {authStatus && (
              <Button
                text={"Logout"}
                classes={"primary"}
                onClick={() => logoutUser()}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
