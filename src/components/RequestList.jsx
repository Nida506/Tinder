const RequestList = ({ request, reviewRequestButtonHandler }) => {
  const { firstName, lastName, photoUrl, age, gender, about } =
    request.fromUserId;

  return (
    <div className="flex justify-center mb-4">
      <div className="navbar bg-white  w-1/2">
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

        {/* for buttons */}

        <div className="flex  ms-5">
          <button
            onClick={() => reviewRequestButtonHandler("rejected", request._id)}
            className="btn btn-secondary mx-2"
          >
            Reject
          </button>
          <button
            onClick={() => reviewRequestButtonHandler("accepted", request._id)}
            className="btn btn-primary  mx-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestList;
