import React from 'react'
import { authService } from '../../services/authService';
import { addAuthors } from '../../store/slices/authorsSlice';
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from "../index"
import { config } from '../../config/config';
import { databaseService } from '../../services/databaseService';
function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function createAccount(formData) {
        const { name, email } = formData;
        authService.signup({ ...formData })
            .then((userData) => {
                if (userData) {
                    const { $id, name, email } = userData;

                    databaseService.createAuthor($id, { name, email })
                        .then((author) => console.log("Author Created"))
                        .catch((err) => console.log("Author not created: ", err))
                        .finally(() => {
                            databaseService.getAuthors()
                                .then((authors) => dispatch(addAuthors(authors.documents)))
                                .catch((err) => console.log("Can't Get Authors : ", err))
                        })
                    navigate("/signin")
                }
            })
            .catch((err) => {
                console.log("SignUp.jsx :: ERROR :: ", err);
            })
    }

    return (

        <form onSubmit={handleSubmit(createAccount)}>
            <Input
                type="text"
                label="Enter Full Name:"
                placeholder="Name"
                required={true}
                error={errors.name ? errors.name.message : ""}
                {...register("name", { required: true })}
            />

            <Input
                type="email"
                label="Enter Email:"
                placeholder="Email"
                required={true}
                error={errors.email ? errors.email.message : ""}
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                    }
                })}
            />

            <Input
                type="password"
                label="Enter Password:"
                placeholder="Password"
                required={true}
                error={errors.password ? errors.password.message : ""}
                {...register("password", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#{}^])[A-Za-z\d@$!%*?&#{}^]{8,}$/gm.test(value) || "Password must have minimum 8 digits, a number, a special character, a capital letter and a small letter"
                    }
                })}
            />

            <Input type="submit" className="button-primary" value="Sign Up" />

            <p className="bottom">Already have account? <Link to="/signin">SingIn Here</Link></p>
        </form>

    )
}

export default Signup