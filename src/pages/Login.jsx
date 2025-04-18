import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./../Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect when logged in
    if (isSuccess && user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    console.log(userData);
    dispatch(login(userData));
  };

  return (
      <div className="login-container">
        <div className="login-left">
          <img
            src="/images/dentalbg.png"
            alt="Dentist"
            className="login-image"
          />
        </div>
        <div className="login-right">
          <div className="login-box">
            {/* <img className="img logo" src="/images/aliceLogo.png" /> */}
            <h1 className="text-primary mt-4 mb-1 text-start">
              Alice Dental Care
            </h1>
            <h3 className="text-start">Nice to see you again</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group mt-4">
                <label className="text-sm text-start">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Enter Your email"
                  required
                />
              </div>
              <div className="form-group mt-4">
                <label className="text-sm text-start">Password</label>
                <input
                  type="password"
                  className="formcontrol"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Enter Your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                Sign in
              </button>
              <div className="divider">
                <span>OR</span>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  window.location.href =
                    "http://localhost:5001/api/v1/auth/google";
                }}
              >
                <FcGoogle />
                Sign in with Google
              </button>
            </form>

            <p className="signup-text">
              Don't have an account?{" "}
              <a className="text-primary" href="/register">
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
  );
}
export default Login;
