import { useForm } from "react-hook-form";
import { Input, Loading } from "../index";
import { useNavigate } from "react-router";
import authService from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { login as localLogin } from "../../store/features/authSlice";
import { useReducer } from "react";
import { setCurrentAuthor } from "../../store/features/authorsSlice";

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

function LoginForm() {
  const [loading, dispatchLoading] = useReducer(handleLoading, {
    active: false,
    message: "Loading",
  });

  const authors = useSelector((state) => state.AuthorsReducer.authors);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dipatch = useDispatch();

  async function loginUser({ email, password }) {
    // Loading started
    dispatchLoading({ type: "START", message: "Logging In" });

    const session = await authService.login({ email, password });
    if (session) {
      dispatchLoading({ type: "CONTINUE", message: "You are logged in ✔️" });
      dispatchLoading({ type: "END", message: "" });

      // cofiguring the local login
      dipatch(localLogin(session));

      // Setting Up Current Author
      if (authors && authors.length > 0) {
        const userId = session.userId;

        const currAuthor = authors.filter((author) => author.$id === userId)[0];

        if (currAuthor) {
          dipatch(setCurrentAuthor(currAuthor));
        }
      }

      navigate("/");
    }
  }

  function onSubmit(data) {
    const { email, password } = data;
    loginUser({ email, password });
  }

  if (loading.active) {
    return <Loading message={loading.message} />;
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)} className="form signup">
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
          })}
          inputError={errors.password ? errors.password : ""}
        />

        <Input value={"Login"} type="submit" classes={"btn primary"} />
      </form>
      <p>
        Don't have any account?{" "}
        <button className="tertiary" onClick={() => navigate("/signup")}>
          Register
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
