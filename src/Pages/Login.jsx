import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("babar@gmail.com");
  const [password, setPassword] = useState("babar@123N");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //login handler
  const loginHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signIn",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      return navigate("/explore");
    } catch (err) {
      setError(err.response.data);
    }
  };

  // sign Up handler
  const signUpHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-primary">
            {isSignIn ? "Login" : "SignUp"}
          </h2>

          {/* for first Name and Second Name  */}

          {isSignIn ? (
            ""
          ) : (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </>
          )}

          {/* for email */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <p className="text-red-400">{error}</p>
          <div className="card-actions flex justify-center mt-1">
            {isSignIn ? (
              <button onClick={loginHandler} className="btn btn-primary">
                Login
              </button>
            ) : (
              <button onClick={signUpHandler} className="btn btn-primary">
                Sign Up
              </button>
            )}
          </div>
          <p onClick={() => setIsSignIn((value) => !value)}>
            {isSignIn
              ? "Don't have an Account ? SignUp"
              : " Already have an Account ? Login Now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
