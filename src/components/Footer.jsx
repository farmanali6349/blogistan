import React from "react";
import Logo from "./header/Logo";
import { useNavigate } from "react-router";

function Footer({ categories }) {
  const navigate = useNavigate();
  return (
    <>
      <footer className="container footer">
        <Logo />
        <div className="footer-categories">
          <h3>Categories</h3>
          <ul>
            {categories &&
              categories?.map((category) => {
                return (
                  <li
                    key={category.$id}
                    onClick={() => navigate(`/category/${category?.$id}`)}
                  >
                    {category?.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </footer>
      <p className="attribution">
        Created with ❤️ by
        <a href="https://www.linkedin.com/in/farmanali6349/" target="_blank">
          Farman Ali
        </a>
      </p>
    </>
  );
}

export default Footer;
