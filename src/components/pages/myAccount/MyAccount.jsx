import React from 'react'
import {PageTitle, Container} from "../../index"
import { useSelector } from 'react-redux'
function MyAccount() {
    const userData = useSelector(state => state.authSliceReducer.userData)

  return (
    <>
    {userData ? (
        <>
        <PageTitle
            title={userData.name} description={userData.bio && userData.bio ? userData.bio : "Here lies the bio of user."}
        />
        </>
    ) : <p>No User Found</p>}
    </>
  )
}

export default MyAccount