import styles from "./ConnectionList.module.css";

const ConnectionList = ({ connection }) => {
  // extract details of single connection
  const { firstName, lastName, photoUrl, age, gender, about } = connection;

  return (
    <div className="flex justify-center mb-4">
      <div
        className={`navbar bg-white ${styles.listSetting} flex rounded-full`}
      >
        <div className="w-28 right-0  p-0  pe-0">
          <img
            src={photoUrl}
            alt="Photo"
            className={`rounded-full ${styles.imgSetting} me-0 pe-0 right-0 border-rose-500 border-2`}
          ></img>
        </div>
        <div className="items-start  flex-col ps-0 ms-0 left-0 right-0 pe-3">
          <div className="font-semibold text-stone-950 text-2xl">
            {firstName + " " + lastName}
          </div>

          <div className="font-semibold text-stone-950 text-base">{about}</div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionList;
