import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Authlayout({ children, authentication = true }) {
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.authSliceReducer.status);
    const navigate = useNavigate();

    useEffect(() => {
        if(authentication && authStatus !== authentication) {
            navigate("/signin")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }

        setLoader(false)
    }, [authentication, authStatus, navigate])


    return loader ? <p>Loading ....</p> : <>{children}</>
}

export default Authlayout