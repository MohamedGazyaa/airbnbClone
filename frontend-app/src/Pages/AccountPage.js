import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { logout } from "../Redux/currentUserSlice";


const AccountPage = () => {
  const currentUser = useSelector((state) => state.currentUser.user);
  let { subpage } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (subpage === undefined) subpage = "profile";

  const handleLogout = async () => {
    await axios.post("/logout");
    dispatch(logout());
    navigate('/login');
  };

  const linkClasses = (type = null) => {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
        <Link className={linkClasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-md mx-auto">
          logged in as {currentUser.name} ({currentUser.email}) <br />
          <button
            onClick={handleLogout}
            className="bg-primary py-2 px-6 text-white rounded-xl w-full mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
