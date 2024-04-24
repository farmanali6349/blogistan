import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "../index"

function CreateCategory() {

    const [isCreate, setIsCreate] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const createCategory = (formData) => {
        setIsCreate(false)
        console.log(formData)
    }

    const validateInput = (input) => {
        // Remove spaces from the input value
        let valueWithoutSpaces = input.target.value.replace(/\s/g, '');

        // Check if the length of the value without spaces exceeds the limit
        if (valueWithoutSpaces.length > 30) {
            // Truncate the input value to 30 characters without spaces
            input.target.value = valueWithoutSpaces.substring(0, 30);
        }
    }


    return (
        <div className="create-category">

            {!isCreate ? (
                <form className="create-category" onSubmit={handleSubmit(createCategory)}>
                    <Input type="text" onInput={(e) => validateInput(e)} maxLength="30" pattern="^\S*$" title="No spaces allowed" error={errors.category ? errors.category.message : ""} {...register("category", {
                        required: true
                    })}/>
                    <Input type="submit" className="button-primary" />
                    <span onClick={() => setIsCreate(true)}>close</span>
                </form>
            ) : (
                <button className="button-primary" onClick={() => setIsCreate(true)}>Create Category</button>

            )}


        </div>
    )
}

export default CreateCategory