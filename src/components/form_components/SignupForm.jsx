import { useForm } from "react-hook-form";
import { Input, Loading } from "../index";
import { useNavigate } from "react-router";
import authService from "../../services/auth";
import databaseService from "../../services/database";
import { setCurrentAuthor } from "../../store/features/authorsSlice";
import { useReducer } from "react";
import { useDispatch } from "react-redux";

function handleLoading(state, action) {
  switch (action.type) {
    case "START":
      return { active: true, message: action.message };
      break;

    case "CONTINUE":
      return { ...state, message: action.message };

    case "END":
      return { active: false, message: "" };
      break;

    default:
      throw new Error("No loading action found");
      break;
  }
}

function SignupForm() {
  const [loading, dispatchLoading] = useReducer(handleLoading, {
    active: false,
    message: "This is SignUp Loading",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();

  async function signup({ email, password, name }) {
    dispatchLoading({ type: "START", message: "Creating Your Account" });
    const account = await authService.createAccount({ email, password, name });

    if (account) {
      dispatchLoading({
        type: "CONTINUE",
        message: "Account ✔️, Creating Your Author Account",
      });

      // Making current user an author
      const {
        $id,
        name,
        email,
        bio = "",
        facebook = "",
        instagram = "",
        linkedin = "",
        x = "",
        medium = "",
        blogs = [],
        categories = ["uncategorized"],
      } = account;

      const author = await databaseService.createAuthor({
        $id,
        name,
        email,
        bio,
        facebook,
        instagram,
        linkedin,
        x,
        medium,
        blogs,
        categories,
      });

      if (author) {
        dispatchLoading({
          type: "CONTINUE",
          message: "Account ✔️, DONE 🎉",
        });
      }

      dispatchLoading({
        type: "END",
        message: "Account ✔️, DONE 🎉",
      });
      navigate("/login");
    }
  }

  function onSubmit(data) {
    const { name, email, password } = data;
    signup({ email, password, name });
  }

  if (!loading.active) {
    return (
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)} className="form signup">
          <Input
            type="text"
            label={"Enter Your Name: "}
            placeholder={"Farman Ji"}
            {...register("name", {
              required: "Name is required",
            })}
            inputError={errors.name ? errors.name : ""}
          />

          <Input
            type="email"
            label={"Enter Your Email: "}
            placeholder={"email@example.com"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            inputError={errors.email ? errors.email : ""}
          />

          <Input
            type="password"
            label={"Enter Password: "}
            placeholder={"****"}
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

          <Input
            type="password"
            label={"Confirm Password: "}
            placeholder={"****"}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            inputError={errors.confirmPassword ? errors.confirmPassword : ""}
          />

          <Input
            type="submit"
            classes={"btn primary"}
            value={"Create Account"}
          />
        </form>
        <p>
          Already have an account?{" "}
          <button className="tertiary" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      </div>
    );
  } else {
    return <Loading message={loading.message} />;
  }
}

export default SignupForm;
