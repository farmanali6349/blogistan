import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseService from "../services/database";
import authService from "../services/auth";
import { Popup, Loading } from "./index";

function Authlayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.AuthReducer.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? (
    <Popup>
      <Loading message="Loading ... " />
    </Popup>
  ) : (
    <>{children}</>
  );
}
export default Authlayout;
