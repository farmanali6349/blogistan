import React, { useEffect, useState } from "react";
import { Input } from "../../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "../../../services/database";
import { setCurrentAuthor } from "../../../store/features/authorsSlice";

function Social({ facebook, instagram, linkedin, x, medium }) {
  const currAuthor = useSelector((state) => state.AuthorsReducer.currentAuthor);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const [facebookChange, setFacebookChange] = useState(false);
  const [instagramChange, setInstagramChange] = useState(false);
  const [linkedinChange, setLinkedinChange] = useState(false);
  const [xChange, setXChange] = useState(false);
  const [mediumChange, setMediumChange] = useState(false);
  const [formChange, setFormChange] = useState(false);

  const inputFacebook = watch("facebook");
  const inputInstagram = watch("instagram");
  const inputLinkedin = watch("linkedin");
  const inputX = watch("x");
  const inputMedium = watch("medium");

  const [loader, setLoader] = useState(false);
  const [btnText, setBtnText] = useState("Update");

  useEffect(() => {
    reset({ facebook, instagram, linkedin, x, medium });
  }, [facebook, instagram, linkedin, x, medium]);

  useEffect(() => {
    if (
      facebook === inputFacebook &&
      instagram === inputInstagram &&
      linkedin === inputLinkedin &&
      x === inputX &&
      medium === inputMedium
    ) {
      setFormChange(false);
    } else {
      setFormChange(true);
    }
  }, [inputFacebook, inputInstagram, inputLinkedin, inputX, inputMedium]);

  async function updateSocials(data) {
    setLoader(true);
    setBtnText("Updating...");
    await updateAuthor(data);
    setFormChange(false);
    setLoader(false);
    setBtnText("Update");
  }

  async function updateAuthor(data) {
    const updatedAuthor = await databaseService.updateAuthor({
      ...currAuthor,
      facebook: data?.facebook,
      instagram: data?.instagram,
      linkedin: data?.linkedin,
      x: data?.x,
      medium: data?.medium,
    });

    if (updatedAuthor) {
      dispatch(setCurrentAuthor(updatedAuthor));
    }
  }

  return (
    <form className="social" onSubmit={handleSubmit(updateSocials)}>
      <Input
        type="text"
        label={"Facebook: "}
        placeholder={"facebook.com/@yourId"}
        {...register("facebook")}
        inputError={errors.facebook ? errors.facebook : ""}
      />

      <Input
        type="text"
        label={"Instagram: "}
        placeholder={"instagram.com/@yourId"}
        {...register("instagram")}
        inputError={errors.instagram ? errors.instagram : ""}
      />

      <Input
        type="text"
        label={"Linkedin: "}
        placeholder={"linkedin.com/@yourId"}
        {...register("linkedin")}
        inputError={errors.linkedin ? errors.linkedin : ""}
      />

      <Input
        type="text"
        label={"X(Twitter): "}
        placeholder={"x.com/@yourId"}
        {...register("x")}
        inputError={errors.x ? errors.x : ""}
      />

      <Input
        type="text"
        label={"medium: "}
        placeholder={"medium.com/@yourId"}
        {...register("medium")}
        inputError={errors.medium ? errors.medium : ""}
      />

      <Input
        type="submit"
        classes={"btn primary"}
        value={btnText}
        disabled={!formChange}
        loader={loader}
        parentClass={"submit"}
      />
    </form>
  );
}

export default Social;
