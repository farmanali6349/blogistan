import React from 'react'
import { authService } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "../index"
import { useForm } from 'react-hook-form';
function Signin() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    function signinUser(formData) {
        authService.signin({ ...formData })
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData))
                }
            }).catch((err) => console.log("Singin.jsx :: ERROR :: ", err))
    }

    return (
        <>
            <form onSubmit={handleSubmit(signinUser)}>
                <Input
                    label="Enter Email:"
                    placeholder="Email"
                    type="email"
                    error={errors.email ? errors.email.message : ""}
                    {...register("email", {
                        required: true, validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                        }
                    })}
                />

                <Input
                    label="Enter Password:"
                    placeholder="Password"
                    type="password"
                    error={errors.password ? errors.password.message : ""}
                    {...register("password", {
                        required: true, validate: {
                            matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#{}^])[A-Za-z\d@$!%*?&#{}^]{8,}$/gm.test(value) || "Password must have minimum 8 digits, a number, a special character, a capital letter and a small letter"
                        }
                    })}
                />

                <Input
                    type="submit"
                    value={"Sign In"}
                    className="button-primary"
                />

                <p className='bottom'>Don't have account? <Link to="/signup"> SingUp Here </Link></p>
            </form>
        </>
    )
}

export default Signin