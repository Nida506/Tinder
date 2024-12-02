import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("sonia@gmail.com");
  const [password, setPassword] = useState("sonia@123N");
  const [error, setError] = useState("");
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

      return navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-primary">Login</h2>

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
            <button onClick={loginHandler} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
