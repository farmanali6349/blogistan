import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { databaseService } from '../../../../services/databaseService';
import { updateAuthor } from '../../../../store/slices/authorsSlice';
import { useForm } from 'react-hook-form';
import { Input } from "../../../index"
import { facebook } from '../../../../assets/icons';

function Form2({ author }) {

    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            facebook: author?.facebook || "",
            instagram: author?.instagram || "",
            medium: author?.medium || "",
            linkedin: author?.linkedin || "",
            twitter: author?.twitter || "",
        }
    });

    function compareValues() {

        if (getValues("facebook") || getValues("instagram") || getValues("medium") || getValues("linkedin") || getValues("twitter")) {

            if (author.facebook !== getValues("facebook") || author.instagram !== getValues("instagram") || author.medium !== getValues("medium") || author.linkedin !== getValues("linkedin") || author.twitter !== getValues("twitter")) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else {
            setDisabled(true)
        }
    }

    function updateForm2(formData) {

        let {facebook, instagram, medium, linkedin, twitter} = formData;

        if(!facebook.trim()) {
            facebook = null;
        }

        if(!instagram.trim()) {
            instagram = null;
        }

        if(!medium.trim()) {
            medium = null;
        }

        if(!linkedin.trim()) {
            linkedin = null;
        }

        if(!twitter.trim()) {
            twitter = null;
        }

        // Update Author Name, Email and Password
        databaseService.updateAuthor({ ...author, facebook: facebook, instagram: instagram, medium: medium, linkedin: linkedin, twitter: twitter })
            .then((newAuthor) => {
                if (newAuthor) {
                    dispatch(updateAuthor(newAuthor))
                }
            })
            .catch((err) => console.log("Couldn't update author.", err))
            .finally(() => setDisabled(true))
    }



    return (
        <form onSubmit={handleSubmit(updateForm2)}>

            <Input
                label="Facebook:"
                type="url"
                onInput={(e) => { setValue("facebook", e.target.value); compareValues() }}
                {...register("facebook")}
            />

            <Input
                label="Instagram:"
                type="url"
                onInput={(e) => { setValue("instagram", e.target.value); compareValues() }}
                {...register("instagram" )}
            />

            <Input
                label="Medium:"
                type="url"
                onInput={(e) => { setValue("medium", e.target.value); compareValues() }}
                {...register("medium")}
            />

            <Input
                label="LinkedIn:"
                type="url"
                onInput={(e) => { setValue("linkedin", e.target.value); compareValues() }}
                {...register("linkedin")}
            />

            <Input
                label="Twitter(X):"
                type="url"
                onInput={(e) => { setValue("twitter", e.target.value); compareValues() }}
                {...register("twitter")}
            />


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