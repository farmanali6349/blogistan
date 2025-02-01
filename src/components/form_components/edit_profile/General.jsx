import React, { useEffect, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input";
import Loading from "../../Loading";
import { data } from "react-router";
import authService from "../../../services/auth";
import databaseService from "../../../services/database";
import { setCurrentAuthor } from "../../../store/features/authorsSlice";

function General({ name, email, bio }) {
  const storeCurrentAuthor = useSelector(
    (state) => state.AuthorsReducer.currentAuthor
  );

  const [currentAuthor, _setCurrentAuthor] = useState(storeCurrentAuthor);
  const [loader, setLoader] = useState(false);
  const [btnText, setBtnText] = useState("Update");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const dispatch = useDispatch();

  const [nameChange, setNameChange] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [bioChange, setBioChange] = useState(false);
  const [formChange, setFormChange] = useState(false);

  const inputName = watch("name");
  const inputEmail = watch("email");
  const inputBio = watch("bio");

  // Setting form Default values
  useEffect(() => {
    reset({
      name,
      email,
      bio,
    });
  }, [name, email, bio]);

  useEffect(() => {
    if ((name === inputName) & (email === inputEmail) & (bio === inputBio)) {
      setFormChange(false);
    } else {
      setFormChange(true);
    }

    if (name === inputName) {
      setNameChange(false);
    } else {
      setNameChange(true);
    }

    if (email === inputEmail) {
      setEmailChange(false);
    } else {
      setEmailChange(true);
    }

    if (bio === inputBio) {
      setBioChange(false);
    } else {
      setBioChange(true);
    }
  }, [inputName, inputEmail, inputBio]);

  async function updateName(newName) {
    const updatedName = await authService.updateName({ name: newName });
    if (updatedName) {
      const updatedAuthor = await databaseService.updateAuthor({
        ...currentAuthor,
        name: newName,
      });

      if (updatedAuthor) {
        return updatedAuthor;
      }
    }
  }
  async function updateEmail({ email, password }) {
    const updatedUser = await authService.updateEmail({ email, password });

    if (updatedUser) {
      const updatedAuthor = await databaseService.updateAuthor({
        ...currentAuthor,
        email: email,
      });

      if (updatedAuthor) {
        return updatedAuthor;
      }
    }
  }
  async function updateBio(newBio) {
    const updatedAuthor = await databaseService.updateAuthor({
      ...currentAuthor,
      bio: newBio,
    });

    if (updatedAuthor) {
      return updatedAuthor;
    }
  }

  async function updateAuthor(data) {
    if (nameChange) {
      const updatedAuthor = await updateName(data.name);

      if (updatedAuthor) {
        _setCurrentAuthor(updatedAuthor);
        dispatch(setCurrentAuthor(updatedAuthor));
        setNameChange(false);
      }
    }

    if (bioChange) {
      const updatedAuthor = await updateBio(data.bio);
      if (updatedAuthor) {
        _setCurrentAuthor(updatedAuthor);
        dispatch(setCurrentAuthor(updatedAuthor));
        setBioChange(false);
      }
    }

    if (emailChange) {
      const updatedAuthor = await updateEmail({
        email: data.email,
        password: data.password,
      });

      if (updatedAuthor) {
        _setCurrentAuthor(updatedAuthor);
        dispatch(setCurrentAuthor(updatedAuthor));
        setEmailChange(false);
      }
    }
  }

  async function onsubmit(data) {
    setLoader(true);
    await updateAuthor(data);
    setFormChange(false);
    setLoader(false);
  }

  return (
    <form className="general" onSubmit={handleSubmit(onsubmit)}>
      <div className="top">
        <Input
          type="text"
          label={"Name: "}
          placeholder={"Farman Ji"}
          {...register("name", {
            required: "Name is required",
          })}
          classes={nameChange ? "changed" : ""}
          inputError={errors.name ? errors.name : ""}
        />

        <Input
          type="email"
          label={"Email: "}
          placeholder={"email@example.com"}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
          classes={emailChange ? "changed" : ""}
          inputError={errors.email ? errors.email : ""}
        />
      </div>
      <div className="textarea">
        <label htmlFor="bio">Bio: </label>
        <textarea
          name=""
          id="bio"
          className={bioChange ? "changed input-box" : "input-box"}
          {...register("bio")}
        ></textarea>
      </div>

      {emailChange && (
        <Input
          type="password"
          label="Password: "
          placeholder={"Password is required to update 'email' "}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
              message:
                "Password must include uppercase, lowercase, number, and special character",
            },
          })}
          inputError={errors.password ? errors.password : ""}
        />
      )}

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
export default General;
