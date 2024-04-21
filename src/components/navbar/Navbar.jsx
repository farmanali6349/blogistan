import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {logout } from '../../store/slices/authSlice';
import {authService} from "../../services/authService"
import "./Navbar.css"

function Navbar() {


    const authStatus = useSelector(state => state.authSliceReducer.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUser = () => {
        dispatch(login({ name: "Farman Ali" }))
        navigate("/")
    }

    const logoutUser = () => {
        authService.signout()
            .then((value) => {
                console.log("SignOut Value: ", value)
                if(value) {
                    dispatch(logout())
                    navigate('/signin')
                }
            }).catch((err) => {
                console.log("SignOut error ::  ERROR :: ", err)
            })
    }

    const navItems = [
        {
            path: "/blogs",
            name: "Blogs",
            active: true,
            className: "normal"
        },
        {
            path: "/write-blog",
            name: "Write Blog",
            active: true,
            className: "normal"
        },
        {
            path: "my-account",
            name: "My Account",
            active: authStatus,
            className: "normal"
        },
        {
            path: "/signin",
            name: "Signin",
            active: !authStatus,
            className: "button-secondary"
        },
        {
            path: "/signup",
            name: "Signup",
            active: !authStatus,
            className: "button-primary"
        }
    ]
    return (
        <nav className='navbar'>
            <ul>
                {navItems.map((navItem) => navItem.active ? <li key={navItem.name} className={navItem.className && navItem.className ? navItem.className : ""} onClick={() => navigate(navItem.path)}>{navItem.name}</li> : null)}
                {authStatus ? <li className='button-primary' onClick={()=> logoutUser()}>Logout</li> : null}
            </ul>
        </nav>
    )
}

export default Navbar