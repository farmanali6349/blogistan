import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseService from "../services/database";
import authService from "../services/auth";
import { Popup, Loading } from "./index";

function Authlayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const userData = useSelector((state) => state.AuthReducer.userData);
  const authStatus = useSelector((state) => state.AuthReducer.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (authStatus !== null) {
      if (authentication && !authStatus) {
        navigate("/login");
      } else if (!authentication && authStatus) {
        navigate("/");
      }
      setLoader(false);
    }
  }, [authentication, authStatus, userData, navigate]);

  return loader ? (
    <Popup>
      <Loading message="Loading ... " />
    </Popup>
  ) : (
    <>{children}</>
  );
}
export default Authlayout;
