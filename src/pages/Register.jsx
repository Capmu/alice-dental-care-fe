import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    telNumber: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
  });

  const { name, telNumber, email, password, password2, role } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
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
    const { name, value } = e.target;

    // ตรวจสอบเฉพาะฟิลด์ phone
    if (name === "telNumber") {
      // อนุญาตเฉพาะตัวเลขและจำกัดความยาวไม่เกิน 10 หลัก
      const isValid = /^[0-9]*$/.test(value) && value.length <= 10;
      if (!isValid) {
        return; // ไม่อัปเดตค่า ถ้าไม่ผ่านเงื่อนไข
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        telNumber,
        email,
        password,
        role,
      };
    //   console.log(userData);
      dispatch(register(userData))
    }
  };
  return (
    <div className="login-container">
      <div className="flex-2">
        <img src="/images/dentalbg.png" alt="Dentist" className="login-image" />
      </div>
      <div className="flex-2 grid align-items-center mx-20">
        <div className="container-fluid">
          {/* <img className="img logo" src="/images/aliceLogo.png" /> */}
          <h1 className="text-primary mt-4 mb-1 text-start">
            Alice Dental Care
          </h1>
          <h3 className="text-start">Please create an account</h3>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="text-sm text-start">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter Your name"
                    required
                  />
                </div>
                <div className="form-group">
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
                <div className="form-group">
                  <label className="text-sm text-start">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telNumber"
                    name="telNumber"
                    value={telNumber}
                    onChange={onChange}
                    placeholder="Enter Your phone"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-sm text-start">Role</label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    value={role}
                    onChange={onChange}
                    placeholder="Enter Your Role"
                    required
                  />
                </div>
                <div className="form-group">
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
                <div className="form-group">
                  <label className="text-sm text-start">Confirm Password</label>
                  <input
                    type="password"
                    className="formcontrol"
                    id="password2"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder="Confirm Your password"
                    required
                  />
                </div>
              </div>
       
                <button className="btn btn-primary mt-4">Submit</button>

             
            </form>
            <div className="divider">
                <span>OR</span>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary w-full"
                onClick={() => {
                  window.location.href =
                    "http://localhost:5001/api/v1/auth/google";
                }}
              >
                <FcGoogle />
                Continue with Google
              </button>
              <p className="signup-text">
              Already have an account?{" "}
              <a className="text-primary" href="/login">
              Log in now
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Register;
