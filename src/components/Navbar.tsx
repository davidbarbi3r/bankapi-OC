import { NavLink } from 'react-router-dom';
import '../main.css'

export default function Navbar() {
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="./index.html">
        <img
          className="main-nav-logo-image"
          src="argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink className="main-nav-item" to="./sign-in.html">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    </nav>
  );
}
