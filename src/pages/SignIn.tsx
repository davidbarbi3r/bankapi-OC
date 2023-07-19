/* eslint-disable @typescript-eslint/no-misused-promises */
import "../main.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ILoginPayload, setUser } from "../store/userSlice";
import { useLoginMutation } from "../store/api/userApiSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [login, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const dataForm = new FormData(form);
    const formJson = Object.fromEntries(dataForm.entries());
    const userPayload: ILoginPayload = {
      email: dataForm.get("email") as string,
      password: dataForm.get("password") as string,
      token: "",
    };

    if (formJson.email !== "" && formJson.password !== "") {
      await login(userPayload)
        .unwrap()
        .then((data: { body: {token: string} }) => {
          userPayload.token = data.body.token;
          dispatch(setUser({
            ...user,
            email: userPayload.email,
            token: userPayload.token,
          }));
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return;
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} method="post">
        <div className="input-wrapper">
          <label htmlFor="email">Username</label>
          <input type="text" name="email" className={isError ? "error" : ""} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className={isError ? "error" : ""} />
        </div>
        <div className="input-remember">
          <input type="checkbox" name="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          {isLoading ? "... Loading" : isError ? "⚠️ Error" :"Sign In"}
        </button>
      </form>
    </section>
  );
}