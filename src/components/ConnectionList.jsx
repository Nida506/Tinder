const ConnectionList = ({ connection }) => {
  // extract details of single connection
  const { firstName, lastName, photoUrl, age, gender, about } = connection;

  return (
    <div className="flex justify-center mb-4">
      <div className="navbar bg-white  w-1/3">
        <div className=" px-2 ">
          <img
            src={photoUrl}
            alt="Photo"
            className="rounded-full h-20 w-20 border-red-400 border-4"
          ></img>
        </div>
        <div className="flex items-start flex-col px-2">
          <div className="font-semibold text-black text-2xl">
            {firstName + " " + lastName}
          </div>

          <div className="font-semibold text-slate-600 text-base">{about}</div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionList;
