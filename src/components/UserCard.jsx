import React from "react";
import TinderCard from "react-tinder-card";
import styles from "./UserCard.module.css";
const UserCard = ({ user, sendRequestHandler }) => {
  const { _id, photoUrl, firstName, lastName, about } = user;

  const onSwipe = (direction) => {
    console.log(`You swiped ${direction}`);

    // Determine the status based on the swipe direction
    const status = direction === "right" ? "interested" : "ignored";

    // Pass the status and user ID to sendRequestHandler
    sendRequestHandler(status, _id);
  };

  const onCardLeftScreen = () => {
    console.log("Card left the screen");
  };

  return (
    <div className="flex justify-center ">
      <TinderCard
        onSwipe={onSwipe}
        onCardLeftScreen={onCardLeftScreen}
        className={` ${styles.cardSetting} bg-stone-950 rounded-sm shadow-lg overflow-hidden`}
      >
        <div className={` flex-col  justify-center items-center`}>
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className={` ${styles.imgSetting}`}
          />
          <div className={`pb-2 flex-col items-center mx-6 my-6`}>
            <div className=" ">
              <h2
                className={`text-xl font-semibold text-white cursor-pointer `}
              >{`${firstName} ${lastName} `}</h2>
            </div>
            <div className="text-base text-white">
              <p>{about}</p>
            </div>
          </div>
        </div>
      </TinderCard>
    </div>
  );
};

export default UserCard;
