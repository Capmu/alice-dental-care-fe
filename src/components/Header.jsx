import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userData = JSON.parse(localStorage.getItem("user"));
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header px-7">
      <div className="font-bold text-xl align-items-center">
        <Link to="/" className="text-primary">
          <img className="img logo-sm mr-2" src="/images/aliceLogo.png" />
          Alice Dental Care
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <p className="text-primary">Welcome, {userData.name}!</p>
            </li>
            <li>
              <button className="btn btn-outline-primary" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <p className="text-primary">
                  <FaSignInAlt />
                  Login
                </p>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <p className="text-primary">
                  <FaUser />
                  Register
                </p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
export default Header;
