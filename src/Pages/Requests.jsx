import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import RequestList from "../components/RequestList";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  // review the requests either accepted or rejected
  const reviewRequestButtonHandler = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };
  // fetch all requests comming from other users
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-3xl text-center text-white font-medium my-7">
        You have No Friend Requests !!!!
      </h1>
    );

  return (
    <>
      <p className="text-3xl text-center text-white font-medium my-7">
        Friend Requests
      </p>

      {requests &&
        requests.map((request) => {
          return (
            <RequestList
              key={request.fromUserId._id}
              request={request}
              reviewRequestButtonHandler={reviewRequestButtonHandler}
            />
          );
        })}
    </>
  );
};

export default Requests;
