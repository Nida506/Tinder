import Navbar from "../components/Navbar";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className={`${styles.container}  `}>
      <div className={`${styles.overlay}   `}>
        <Navbar />
        <div className={` ${styles.height} flex items-center justify-center `}>
          <div>
            <h1
              className={`text-6xl font-bold text-white ${styles.textShadow}`}
            >
              Start Something epic.
            </h1>

            <div className="flex justify-center">
              <Link
                to="/login"
                className={`${styles.btn} text-xl rounded-full px-4 py-2 mt-5`}
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
