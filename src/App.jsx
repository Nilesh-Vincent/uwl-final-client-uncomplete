import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Login from "./pages/LogIn/LogIn";
import SideBar from "./components/SideBar/SideBar";
import SignUp from "./pages/SignUp/SignUp";
import HeaderLogo from "./components/Header/HeaderLogo";
import AdventureActivity from "./pages/SingleAdventureActivity/AdventureActivity";
import MyProfile from "./pages/MyProfile/MyProfile";
import Bookings from "./pages/Bookings/Bookings";
import Leaderboard from "./pages/Leaderboards/Leaderboard";
import Community from "./pages/Community/Community";
import Challanges from "./pages/Challanges/Challanges";
import Adventures from "./pages/Adventures/Adventures";
import Host from "./pages/Host/Host";

const App = () => {
  return (
    <Router>
      <Content />
    </Router>
  );
};

const Content = () => {
  // Get the current location using the useLocation hook
  const location = useLocation();
  const noNeedHeaderSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  const containerStyle = noNeedHeaderSidebar
    ? styles.appContainerNoSidebarHeader
    : styles.appContainer;

  return (
    <>
      {!noNeedHeaderSidebar && <Header />}
      {noNeedHeaderSidebar && <HeaderLogo />}
      <main className={containerStyle}>
        {!noNeedHeaderSidebar && <SideBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/adventure/:id" element={<AdventureActivity />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-bookings" element={<Bookings />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/challanges" element={<Challanges />} />
          <Route path="/host/:hostId" element={<Host />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
