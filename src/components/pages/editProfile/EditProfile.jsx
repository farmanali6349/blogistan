import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PageTitle, Container } from "../../index"
import Form1 from './forms/Form1'
import Form2 from './forms/Form2'
import Form3 from './forms/Form3'
import "./EditProfile.css"
function EditProfile() {
    const userData = useSelector(state => state.authSliceReducer.userData)
    const authorsData = useSelector(state => state.authorsSliceReducer.authors);
    const author = userData && authorsData ? authorsData.filter((author) => userData.$id === author.$id)[0] : {};

    return (
        <>
            <PageTitle
                title={"Edit Profile"}
                description={"Update Your Profile According To Your Preferences"}
            />

            <div className="edit-profile">
                <Container>
                    <Form1 author={author}/>
                    <Form2 author={author}/>
                    <Form3 author={author}/>
                </Container>
            </div>
        </>
    )
}

export default EditProfile