export default function SignIn() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const dataForm = new FormData(form);
        const formJson = Object.fromEntries(dataForm.entries());

        console.log(formJson);
    };

    return (
        <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="input-wrapper">
            <label htmlFor="username">
                Username
            </label>
            <input type="text" name="username" />
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
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    );
}