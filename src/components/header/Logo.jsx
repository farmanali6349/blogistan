import React from 'react'
import { images } from '../../assets/images/index'
import { useNavigate } from 'react-router'
function Logo() {
    const navigate = useNavigate()
    return (
        <div className="logo" onClick={() => navigate('/')}>
            <img src={images.logo} alt="blogistan" className="logo-img" />
            <h2>Blogistan</h2>
        </div>
    )
}

export default Logo