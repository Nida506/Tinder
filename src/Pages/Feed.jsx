import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";
import { removeFromFeed } from "../utils/feedSlice";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  // get feed users
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  // send interested or ignored request
  const sendRequestHandler = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      // console.log(_id);
      dispatch(removeFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed?.length <= 0)
    return (
      <h1 className="text-3xl text-center text-white font-medium my-7">
        No more new users found !!!!
      </h1>
    );
  return (
    feed?.length > 0 && (
      <div className="flex justify-center my-18">
        <UserCard user={feed[0]} sendRequestHandler={sendRequestHandler} />
      </div>
    )
  );
};

export default Feed;
