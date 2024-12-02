import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  //editProfile handler
  const editProfileHandler = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <>
      {/* for toast : show for messag */}

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-40 mt-12 ">
        {/* edit profile */}
        <div className="card bg-base-300 w-96 mx-4 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title text-primary flex justify-center">
              Edit Profile
            </h2>
            {/* for first Name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name </span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            {/* for last name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">LastName </span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {/* for photoUrl */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">photoUrl </span>
              </div>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {/* for last name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age </span>
              </div>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {/* for last name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender </span>
              </div>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {/* for last name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About </span>
              </div>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            {/* for error show */}
            {error && <p className="text-red-400">{error}</p>}
            <div className="card-actions flex justify-center mt-1">
              <button onClick={editProfileHandler} className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* user own profile */}

        <div className="card bg-base-300 w-96  mx-4 shadow-xl">
          <figure>
            <img src={photoUrl} alt="photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstName + " " + lastName} +{" "}
              {age && gender && <p>{" (  " + age + ", " + gender + " ) "}</p>}{" "}
            </h2>

            <p>{about}</p>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
