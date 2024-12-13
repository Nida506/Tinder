import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //logout handler

  const logoutHandler = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`navbar py-3  ${user ? "bg-black" : "bg-none"}`}>
      <div className="flex-1">
        <Link
          to={user ? "/explore" : ""}
          className=" text-4xl font-bold  text-white"
        >
          <div className="flex">
            <img src="/logo.png" alt="logo" className="h-12 w-10 me-2" />
            <h1 className="mt-1"> Tinder</h1>
          </div>
        </Link>
      </div>
      {user ? (
        <div className="flex-none gap-2">
          <div className="form-control">Welcome , {user.firstName}</div>
          <div className="dropdown dropdown-end mx-3 flex ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link onClick={logoutHandler}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className={`${styles.btn} text-base font-semibold rounded-full   py-2 px-4   me-3`}
        >
          Log In
        </Link>
      )}
    </div>
  );
};

export default Navbar;
