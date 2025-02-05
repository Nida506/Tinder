import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Feed from "./Pages/Feed";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Connections from "./Pages/Connections";
import Requests from "./Pages/Requests";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/app" element={<Body />}>
              <Route path="/app/login" element={<Login />} />
              <Route path="/app/explore" element={<Feed />} />
              <Route path="/app/profile" element={<Profile />} />
              <Route path="/app/connections" element={<Connections />} />
              <Route path="/app/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
