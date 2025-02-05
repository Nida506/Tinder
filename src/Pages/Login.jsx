import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [emailId, setEmailId] = useState("babar@gmail.com");
  const [password, setPassword] = useState("babar@123N");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showValidMsgToast, setShowValidMsgToast] = useState(false);
  const [showInValidMsgToast, setShowInValidMsgToast] = useState(false);
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
      console.log(res);
      dispatch(addUser(res.data.data));
      setShowValidMsgToast(res.data.message);
      setTimeout(() => {
        setShowInValidMsgToast(false);
        return navigate("/app/explore");
      }, 600);
    } catch (err) {
      setShowInValidMsgToast(err.response.data);
      setTimeout(() => {
        setShowInValidMsgToast(false);
      }, 3000);
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

      dispatch(addUser(res.data.data));
      return navigate("/app/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* for toast message */}

      {(showValidMsgToast || showInValidMsgToast) && (
        <div className="toast toast-top toast-center mt-2">
          <div className="alert py-2 alert-white border-none text-stone-950 font-semibold text-xl bg-white">
            <FontAwesomeIcon
              icon={showValidMsgToast ? faCircleCheck : faCircleXmark}
              className={`text-3xl ${
                showValidMsgToast ? "text-lime-500" : "text-red-500"
              }`}
            />
            <span>
              {showValidMsgToast ? showValidMsgToast : showInValidMsgToast}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-center height items-center backgroundImage ">
        <div className=" bg-white w-80 shadow-xl rounded-lg ">
          <div className="card-body">
            <h2
              className={`card-title flex justify-center pb-3  ${styles.cardTitleTextSize} font-bold text-stone-950`}
            >
              {isSignIn ? "Welcome to Tinder" : "Create Account"}
            </h2>

            {/* for first Name and Second Name  */}

            {isSignIn ? (
              ""
            ) : (
              <>
                <label className="form-control w-full max-w-xs">
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Enter Your First Name ..."
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered placeholder-stone-300 bg-stone-950 text-white w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter Your Last Name ..."
                    className="input input-bordered w-full max-w-xs bg-stone-950 placeholder-stone-300 text-white"
                  />
                </label>
              </>
            )}

            {/* for email */}
            <label className="form-control w-64   max-w-xs">
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter Email ..."
                className="input input-bordered w-full text-white  placeholder-stone-300 bg-stone-950 max-w-xs"
              />
            </label>

            <label className="form-control w-64  max-w-xs">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password ..."
                className="input input-bordered w-full bg-stone-950 placeholder-stone-300 text-white max-w-xs"
              />
            </label>

            <div className="card-actions  flex justify-center mt-1">
              {isSignIn ? (
                <button
                  onClick={loginHandler}
                  className={`${styles.btn} px-12 pt-1 pb-1.5 text-lg font-bold`}
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={signUpHandler}
                  className={`${styles.btn} px-12 pt-1 pb-1.5 text-lg font-bold`}
                >
                  Sign Up
                </button>
              )}
            </div>
            <p
              className={` ${styles.textShadow} text-stone-950 font-semibold cursor-pointer text-center `}
              onClick={() => setIsSignIn((value) => !value)}
            >
              {isSignIn
                ? "Don't have an Account ? SignUp"
                : " Already have Account? Login Now"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
