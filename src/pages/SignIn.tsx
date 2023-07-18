import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const form = event.currentTarget;

        const dataForm = new FormData(form);
        const formJson = Object.fromEntries(dataForm.entries());

        fetch("http://localhost:3001/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: JSON.stringify(formJson),
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            navigate("/user-profile");
          }
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          setLoading(false);
        });

        console.log(formJson);
    };

    return (
        <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="input-wrapper">
            <label htmlFor="email">
                Username
            </label>
            <input type="text" name="email" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" name="remember-me" />
            <label htmlFor="remember-me">
                Remember me
            </label>
          </div>
          <button type="submit" className="sign-in-button">{loading ? "... Loading" : "Sign In"}</button>
        </form>
      </section>
    );
}