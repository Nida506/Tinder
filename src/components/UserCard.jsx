const UserCard = ({ user, sendRequestHandler }) => {
  // extract details of feed user
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-72  shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" className="w-96 height1" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName} </h2>
        {age && gender && <p>{" (  " + age + ", " + gender + " ) "}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-2">
          <button
            onClick={() => sendRequestHandler("ignored", _id)}
            className="btn btn-primary"
          >
            Ignore
          </button>
          <button
            onClick={() => sendRequestHandler("interested", _id)}
            className="btn btn-secondary"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
