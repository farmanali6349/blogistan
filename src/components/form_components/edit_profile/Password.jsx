import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../index";
import authService from "../../../services/auth";

function Password() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm();

  const [btnText, setBtnText] = useState("Update");
  const [loader, setLoader] = useState(false);

  const inputOldPass = watch("password");
  const inputNewPass = watch("newPassword");
  const inputConfirmPass = watch("confirmPassword");
  const [formChange, setFormChange] = useState(false);

  useEffect(() => {
    if (inputOldPass || inputNewPass || inputConfirmPass) {
      setFormChange(true);
    } else {
      setFormChange(false);
    }
  }, [inputOldPass, inputNewPass, inputConfirmPass]);

  async function changePassword(data) {
    setLoader(true);
    setBtnText("Updating...");
    await updatePassword({
      oldPassword: data?.password,
      password: data?.newPassword,
    });
    setLoader(false);
    setBtnText("Update");
  }

  async function updatePassword({ oldPassword, password }) {
    const updated = await authService.updatePassword({ oldPassword, password });

    if (updated) {
      reset();
    }
  }

  return (
    <form
      action=""
      className="password"
      onSubmit={handleSubmit(changePassword)}
    >
      <Input
        type="password"
        label="Old Password: "
        placeholder={"Enter Old Password "}
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

      <div className="bottom">
        {/* New Password */}
        <Input
          type="password"
          label="New Password: "
          placeholder={"Enter New Password "}
          {...register("newPassword", {
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
          inputError={errors.newPassword ? errors.newPassword : ""}
        />

        <Input
          type="password"
          label="Confirm New Password: "
          placeholder={"Confirm New Password "}
          {...register("confirmPassword", {
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
          inputError={errors.confirmPassword ? errors.confirmPassword : ""}
        />
      </div>

      <Input
        type="submit"
        classes={"btn primary"}
        value={btnText}
        disabled={!formChange}
        loader={loader}
        parentClass={"submit"}
      />

      {formChange && <p className="form-change">The form is changed. </p>}
    </form>
  );
}

export default Password;
