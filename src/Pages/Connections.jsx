import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ConnectionList from "../components/ConnectionList";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log(connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="text-3xl text-center text-white font-medium my-7">
        No connections !!!!
      </h1>
    );

  return (
    <>
      <p className="text-3xl text-center text-white font-medium my-7">
        Connections
      </p>

      {connections &&
        connections.map((connection) => {
          return (
            <ConnectionList key={connection._id} connection={connection} />
          );
        })}
    </>
  );
};

export default Connections;
