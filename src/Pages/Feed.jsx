import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFromFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  // get feed users
  const getFeed = async () => {
    if (feed.length > 0) return;
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

      // Remove swiped user from the feed
      dispatch(removeFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;
  if (feed?.length <= 0)
    return (
      <div className="backgroundImage height pt-14">
        <h1 className="text-3xl text-center text-stone-950 font-medium">
          No more new users found!
        </h1>
      </div>
    );

  return (
    <div className="flex justify-center backgroundImage height pt-14 ">
      <UserCard
        key={feed[0]._id}
        user={feed[0]}
        sendRequestHandler={sendRequestHandler}
      />
    </div>
  );
};

export default Feed;
