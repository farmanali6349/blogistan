// General Information Form
import React, { useEffect, useState } from 'react'
import { Input } from "../../../index"
import { updateUserName, updateUserEmail } from "../../../../store/slices/authSlice"
import { updateAuthor } from "../../../../store/slices/authorsSlice"
import { useForm } from 'react-hook-form'
import { authService } from '../../../../services/authService'
import { databaseService } from '../../../../services/databaseService'
import { updateStore } from '../../../../store/store'
import { useDispatch } from 'react-redux'

function Form1({ author }) {


    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            name: author?.name || "",
            email: author?.email || "",
            bio: author?.bio || ""
        }
    });

    function compareValues() {

        if (author.name || author.email || author.bio) {
            if (author.name !== getValues("name") || author.email !== getValues("email") || author.bio !== getValues("bio")) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }
    }

    function updateForm1(formData) {

        const $id = author.$id;
        const { name, email, bio, password } = formData;

        if (formData && formData.name !== author.name) {
            authService.updateName(name)
                .then((value) => {

                    if (value) {
                        dispatch(updateUserName(value.name))
                    }
                })
                .catch((error) => console.log("User Name is not update with Error", error))
                .finally(() => {

                    if (formData && formData.email !== author.email) {
                        authService.updateEmail({ email, password })
                            .then((value) => {

                                if (value) {
                                    dispatch(updateUserEmail(value.email))
                                }
                            })
                            .catch((error) => console.log("User Email is not update with Error", error))
                            .finally(() => {
                                // Update Author Name, Email and Password
                                databaseService.updateAuthor({ ...author, name: name, email: email, bio: bio })
                                    .then((newAuthor) => {
                                        if (newAuthor) {
                                            dispatch(updateAuthor(newAuthor))
                                        }
                                    })
                                    .catch((err) => console.log("Couldn't update author.", err))
                                    .finally(() => setDisabled(true))
                            })
                    }
                })
        } else if (formData && formData.email !== author.email) {
            authService.updateEmail({ email, password })
                .then((value) => {

                    if (value) {
                        dispatch(updateUserEmail(value.email))
                    }
                })
                .catch((error) => console.log("User Email is not update with Error", error))
                .finally(() => {
                    // Update Author Name, Email and Password
                    databaseService.updateAuthor({ ...author, name: name, email: email, bio: bio })
                        .then((newAuthor) => {
                            if (newAuthor) {
                                dispatch(updateAuthor(newAuthor))
                            }
                        })
                        .catch((err) => console.log("Couldn't update author.", err))
                        .finally(() => setDisabled(true))
                })
        } else {
            // Update Author Name, Email and Password
            databaseService.updateAuthor({ ...author, name: name, email: email, bio: bio })
                .then((newAuthor) => {
                    if (newAuthor) {
                        dispatch(updateAuthor(newAuthor))
                    }
                })
                .catch((err) => console.log("Couldn't update author.", err))
                .finally(() => setDisabled(true))
        }


    }


    return (
        <form onSubmit={handleSubmit(updateForm1)}>
            <div className="name-email">
                <Input
                    label="Name:"
                    type="text"
                    onInput={(e) => { setValue("name", e.target.value); compareValues() }}
                    error={errors.name ? errors.name.message : ""}
                    {...register("name", { required: true })}
                    required={true}
                />
                <Input
                    label="Email:"
                    type="email"
                    onInput={(e) => { setValue("email", e.target.value); compareValues() }}
                    error={errors.email ? errors.email.message : ""}
                    {...register("email", {
                        required: true, validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                        }
                    })}
                    required={true}
                />
            </div>
            <div className="textarea">
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    rows="10"
                    onInput={(e) => { setValue("bio", e.target.value); compareValues() }}
                    {...register("bio")}>
                </textarea>
            </div>

            <div className="name-email">
                <Input
                    placeholder="Enter Password To Update"
                    type="password"
                    error={errors.password ? errors.password.message : ""}
                    {...register("password", {
                        required: true, validate: {
                            matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#{}^])[A-Za-z\d@$!%*?&#{}^]{8,}$/gm.test(value) || "Password must have minimum 8 digits, a number, a special character, a capital letter and a small letter"
                        }
                    })}
                    required={true}
                />

                <Input
                    type="submit"
                    value="Update"
                    disabled={disabled}
                    className={disabled ? "disabled" : "button-primary"}
                />
            </div>

        </form>
    )
}

export default Form1
