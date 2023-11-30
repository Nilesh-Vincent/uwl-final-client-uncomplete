import { Fragment, useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../UI/Logo/Logo";
import AuthContext from "../../store/auth-context";
import axiosInstance from "../../utils/axiosInstance";
import BaseURL from "../../utils/BaseURL";
import mapboxgl from "@mapbox/mapbox-sdk";
import GeocodingService from "@mapbox/mapbox-sdk/services/geocoding";

const Header = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const [options, setOptions] = useState("Every Adventure");
  const [showOptions, setShowOptions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [showLocationSearchBar, setShowLocationSearchBar] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const isLoggedIn = context.isLoggedIn;

  const activityRef = useRef(null);
  const profileRef = useRef(null);

  const submitSearchHandler = (event) => {
    event.preventDefault();

    console.log("Selected Location:", locationValue);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Adventure Type:", options);

    navigate("/adventures", {
      state: { latitude, longitude, options },
    });

    window.location.reload();
  };

  useEffect(() => {
    axiosInstance
      .get(`/user/me`)
      .then((response) => {
        setProfile(response.data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const mapboxClient = mapboxgl({
      accessToken:
        "pk.eyJ1IjoibmlsZXNoNDQiLCJhIjoiY2xpb2JucnhmMDdtYTNlbnZoc3FjemU1ZiJ9.ggJRNTOToRQRv4i3o2q9Vw",
    });
    const geocodingService = GeocodingService(mapboxClient);

    geocodingService
      .forwardGeocode({
        query: locationValue,
        limit: 5, // You can adjust the number of suggestions here
      })
      .send()
      .then((response) => {
        const features = response.body.features;
        setSuggestions(features);
        console.log(suggestions);
        console.log(features); // Log the suggestions array to the console
      })
      .catch((error) => console.error(error));
  }, [locationValue]);

  const setSuggestionHandler = (suggestion) => {
    setLocationValue(suggestion.text);
    setLatitude(suggestion.center[1]);
    setLongitude(suggestion.center[0]);
    setShowLocationSearchBar(false);
  };

  const optionShowHandler = (event) => {
    setShowOptions((prevState) => !prevState);
  };

  const setShowProfileMenuHandler = (event) => {
    setShowProfileMenu((prevState) => !prevState);
  };

  const setLocationChangeHandler = (event) => {
    setLocationValue(event.target.value);
    console.log("location value ist " + event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activityRef.current && !activityRef.current.contains(event.target)) {
        setShowOptions(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <div className={styles["headerContainer"]}>
        <Link to="/">
          <Logo />
        </Link>
        <main className={styles["search"]}>
          <div className={styles["searchItems"]}>
            <div className={styles["searchItemLocation"]}>
              <input
                type="text"
                placeholder="Where to?"
                className={styles["searchLocation"]}
                onChange={setLocationChangeHandler}
                value={locationValue}
                onClick={() => {
                  setShowLocationSearchBar(true);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles["searchIcon"]}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
            </div>
            {showLocationSearchBar && suggestions.length >= 1 && (
              <div className={styles.suggestionList}>
                {suggestions.map((suggestion) => (
                  <p
                    className={styles.suggestionListItem}
                    key={suggestion.id}
                    onClick={() => setSuggestionHandler(suggestion)}
                  >
                    {suggestion.place_name}
                  </p>
                ))}
              </div>
            )}
            <div
              className={styles["searchItemAdventure"]}
              onClick={optionShowHandler}
              ref={activityRef}
            >
              <div>{options}</div>
              {showOptions && (
                <div className={styles["option"]}>
                  <ul>
                    <li
                      onClick={() => {
                        setOptions("every adventure");
                      }}
                    >
                      Every Adventure
                    </li>
                    <li
                      onClick={() => {
                        setOptions("scuba diving");
                      }}
                    >
                      Scuba Diving
                    </li>
                    <li
                      onClick={() => {
                        setOptions("wildlife safari");
                      }}
                    >
                      Wildlife Safari
                    </li>
                    <li
                      onClick={() => {
                        setOptions("paragliding");
                      }}
                    >
                      Paragliding
                    </li>
                    <li
                      onClick={() => {
                        setOptions("trekking");
                      }}
                    >
                      Trekking
                    </li>
                    <li
                      onClick={() => {
                        setOptions("rock climbing");
                      }}
                    >
                      Rock Climbing
                    </li>
                    <li
                      onClick={() => {
                        setOptions("white water rafting");
                      }}
                    >
                      White Water Rafting
                    </li>
                  </ul>
                </div>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={styles["searchIcon"]}
              >
                <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button
              type="submit"
              className={styles["submitBtn"]}
              onClick={submitSearchHandler}
            >
              Search
            </button>
          </div>
        </main>
        {isLoggedIn && (
          <div className={styles["userInfo"]} ref={profileRef}>
            <div className={styles["userPoints"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`${styles["trophyIcon"]}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                  clipRule="evenodd"
                />
              </svg>
              {!loading && <p>{profile.points}</p>}
            </div>
            <div
              className={styles["userProfileIcon"]}
              onClick={setShowProfileMenuHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${styles["hamburgerIcon"]}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <img
                src={`${BaseURL}/img/users/${profile.photo}`}
                alt="Profile Picture"
                className={styles["profilePhoto"]}
              />
              {showProfileMenu && (
                <div className={styles["profileMenu"]}>
                  <ul>
                    <Link to="/my-profile">
                      <li>Profile</li>
                    </Link>
                    <Link to="/my-bookings">
                      <li>My Bookings</li>
                    </Link>
                    <li>Settings</li>
                    <li>Reviews</li>
                    <li onClick={context.onLogout}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className={styles["authInfo"]}>
            <Link to="/login">
              <div className={styles["logIn"]}>Log In</div>
            </Link>
            <Link to="/signup">
              <div className={styles["signUp"]}>Sign Up</div>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Header;
