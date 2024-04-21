import React from 'react'
import {logoIcon} from "../../assets/icons/index"
import "./Logo.css"
import { useNavigate } from 'react-router-dom'
function Logo() {

  const navigate = useNavigate();

  return (
    <div className="logo" onClick={()=> navigate("/")}>
        <img src={logoIcon} alt="blogistan" />
        <h2>Blogistan</h2>
    </div>
  )
}

export default Logo