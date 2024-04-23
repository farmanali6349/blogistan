import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { authService } from '../../../../services/authService';
import { logout } from '../../../../store/slices/authSlice';
import { clearAuthor } from '../../../../store/slices/authorsSlice';
import { useForm } from 'react-hook-form';
import { Input } from "../../../index"
import { useNavigate } from 'react-router-dom';

function Form2({ author }) {

    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();

    const logoutUser = () => {
        const session = JSON.parse(localStorage.getItem('session'));
        authService.signout(session.$id)
            .then((value) => {
                if(value) {
                    localStorage.clear();
                    dispatch(logout())
                    dispatch(clearAuthor())
                    navigate('/signin')
                }
            }).catch((err) => {
                console.log("SignOut error ::  ERROR :: ", err)
            });
    }

    function updateForm3(formData) {

        const {password, oldPassword} = formData;

        if(password && oldPassword) {
            authService.updatePassword({password, oldPassword})
                .then((response) => {
                    if(response) {
                        setDisabled(true)
                        logoutUser();
                    }
                }).catch((err) => {
                    console.log("Passowrd is not updated.", err)
                })
        }
    }

    function comparePassword(value) {
        return getValues("password") === value
    }

    function compareValues() {
        if(getValues("oldPassword") && getValues("password") && getValues("newPasswordConfirm")) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }



    return (
        <form onSubmit={handleSubmit(updateForm3)}>

            <Input
                label="Old Password:"
                placeholder="Old Password"
                type="password"
                error={errors.oldPassword ? errors.oldPassword.message : ""}
                onInput={(e) => { setValue("oldPassword", e.target.value); compareValues() }}
                {...register("oldPassword", {
                    required: true, validate: {
                        matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#{}^])[A-Za-z\d@$!%*?&#{}^]{8,}$/gm.test(value) || "Password must have minimum 8 digits, a number, a special character, a capital letter and a small letter"
                    }
                })}
                required={true}
            />

            <div className="name-email">
                <Input
                    label="New Password:"
                    placeholder="New Password"
                    type="password"
                    error={errors.password ? errors.password.message : ""}
                    onInput={(e) => { setValue("password", e.target.value); compareValues() }}
                    {...register("password", {
                        required: true, validate: {
                            matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#{}^])[A-Za-z\d@$!%*?&#{}^]{8,}$/gm.test(value) || "Password must have minimum 8 digits, a number, a special character, a capital letter and a small letter"
                        }
                    })}
                    required={true}
                />

                <Input
                    label="Confirm New Password:"
                    placeholder="Confirm New Password"
                    type="password"
                    onInput={(e) => { setValue("newPasswordConfirm", e.target.value); compareValues() }}
                    error={errors.newPasswordConfirm ? errors.newPasswordConfirm.message : ""}
                    {...register("newPasswordConfirm", {
                        required: true, validate: {
                            matchPatern: (value) => comparePassword(value) || "Password is not same as previous new password"
                        }
                    })}
                    required={true}
                />
            </div>

            <Input
                type="submit"
                value="Update"
                disabled={disabled}
                className={disabled ? "disabled" : "button-primary"}
            />

        </form>
    )
}

export default Form2