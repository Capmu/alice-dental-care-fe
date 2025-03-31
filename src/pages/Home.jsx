import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaTicketAlt,
  FaAddressBook,
  FaSearch,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { MdGridView, MdAddBox } from "react-icons/md";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const userData = {
      email,
      name,
      token,
    };
    if (token && name && email) {
      localStorage.setItem("user", userData);
      localStorage.setItem("name", name);

      // Optional: เก็บ token ลง localStorage
      localStorage.setItem("token", token);

      navigate("/", { replace: true });
    }
  }, [location.search]);
  return (
    <div className="bg-home">
    <div className="grid align-items-center h-screen-nav">
      <div>
        <section className="heading">
          <h3 className="text-primary mb-1">Alice Dental Care</h3>
          <p>Please choose from an option below</p>
        </section>
        <div className="grid grid-cols-3 gap-3 mx-10">
          {/* Card 1 */}
          <div className="card border-primary-200 shadow rounded">
            <div className="card-body p-5">
              <h3 className="text-primary mb-1">View My Booking</h3>
              <p className="card-text">
                Check and manage your dental bookings.
              </p>
              <Link to="/booking" className="btn btn-outline-primary mt-3">
                <MdGridView className="card-icon mr-2" />
                View Bookings
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card border-primary-200 shadow rounded">
            <div className="card-body p-5">
              <h3 className="text-primary mb-1">Create New Booking</h3>
              <p className="card-text">
                Schedule a new booking with your dentist.
              </p>
              <Link to="/new-booking" className="btn btn-outline-primary mt-3">
                <MdAddBox className="card-icon mr-2" />
                Create Booking
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card border-primary-200 shadow rounded">
            <div className="card-body p-5">
              <h3 className="text-primary mb-1">Find Dentist</h3>
              <p className="card-text">
                Search for dentists near your location.
              </p>
              <Link to="/find-dentist" className="btn btn-outline-primary mt-3">
                <FaAddressBook className="card-icon mr-2" />
                Find Dentist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Home;
