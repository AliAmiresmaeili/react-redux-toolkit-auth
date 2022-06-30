import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";

export default function Nav() {
  const authUser = useSelector((x) => x.auth.user);
  const dispatch = useDispatch();
  const logout = () => dispatch(authActions.logout());

  if (!authUser) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav">
        <NavLink to="/" className="nav-item nav-link">
          Home
        </NavLink>
        <button onClick={logout} className="btn btn-link nav-item nav-link">
          Logout
        </button>
      </div>
    </nav>
  );
}
