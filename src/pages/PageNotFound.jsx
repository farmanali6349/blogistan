import React from 'react'
import { Button, Navbar } from '../components'
import { useNavigate } from 'react-router'
function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <div className="page-not-found">
                <div className="not-found">
                    <h1>👽 Area 404</h1>
                    <h3>You cannot be lost until we are here</h3>
                    <Button
                        text={'Go Back To Home'}
                        classes={'primary'}
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
        </>
    )
}

export default PageNotFound