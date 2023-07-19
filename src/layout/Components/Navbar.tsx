import { NavLink, useNavigate } from "react-router-dom";
import "../../main.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/userSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {user.token !== "" ? (
          <div className="main-nav-logged-container">
            <NavLink className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </NavLink>
            <p className="main-nav-item" onClick={() => handleLogout()}>
              <i
                className="fa-solid fa-arrow-right-from-bracket"
                style={{ color: "#000" }}
              ></i>
              Logout
            </p>
          </div>
        ) : (
          <NavLink className="main-nav-item" to="./login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}
