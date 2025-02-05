import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className={`${styles.container}  `}>
      <div className={`${styles.overlay}   `}>
        {/* for navbar of landing page */}

        <div className={`navbar navHeight py-4 bg-none`}>
          <div className="flex-1">
            <Link className=" text-4xl font-bold  text-white">
              <div className="flex">
                <img src="/logo.png" alt="logo" className="h-12 w-10 me-2" />
                <h1 className="mt-1"> Tinder</h1>
              </div>
            </Link>
          </div>
          <Link
            to="/app/login"
            className={`${styles.loginBtn} text-base font-semibold rounded-full   py-2 px-4   me-3`}
          >
            Log In
          </Link>
        </div>

        {/* container */}
        <div className={`height flex items-center justify-center `}>
          <div>
            <h1
              className={`text-6xl font-bold text-white ${styles.textShadow}`}
            >
              Start Something epic.
            </h1>

            <div className="flex justify-center">
              <Link
                to="/app/login"
                className={`${styles.joinBtn} text-xl font-semibold rounded-full px-4 py-2 mt-5`}
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
