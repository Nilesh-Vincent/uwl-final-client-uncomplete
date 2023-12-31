import React, { useState, useEffect } from "react";
import styles from "./MyProfile.module.css";
import axiosInstance from "../../utils/axiosInstance";

import scubaDivingImg from "../../assets/scubaDiving.png";
import whiteWaterRafting from "../../assets/whiteWaterRafting.png";
import rockClimbing from "../../assets/rockClimbing.png";
import wildLifeSafari from "../../assets/safari.svg";
import trekking from "../../assets/Trekking.svg";
import paragliding from "../../assets/paragliding.svg";
import badge1 from "../../assets/Badges/1.png";
import badge2 from "../../assets/Badges/2.png";
import badge3 from "../../assets/Badges/3.png";
import badge4 from "../../assets/Badges/4.png";
import badge5 from "../../assets/Badges/5.png";
import badge6 from "../../assets/Badges/6.png";
import badge7 from "../../assets/Badges/7.png";
import badge8 from "../../assets/Badges/8.png";
import badge9 from "../../assets/Badges/9.png";
import badge10 from "../../assets/Badges/10.png";
import badge11 from "../../assets/Badges/11.png";
import badge12 from "../../assets/Badges/12.png";
import badge13 from "../../assets/Badges/13.png";
import badge14 from "../../assets/Badges/14.png";
import BaseURL from "../../utils/BaseURL";

const badgeImages = [
  badge1,
  badge2,
  badge3,
  badge4,
  badge5,
  badge6,
  badge7,
  badge8,
  badge9,
  badge10,
  badge11,
  badge12,
  badge13,
  badge14,
];

const MyProfile = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

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

  console.log(profile);

  useEffect(() => {
    axiosInstance
      .get(`/bookings`)
      .then((response) => {
        setBookings(response.data.data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(bookings);
      });
  }, []);

  console.log(bookings);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.myProfileContainer}>
      <div className={styles.myProfileItems}>
        <div className={styles.profileHeader}>
          <h1 className={styles.title}>Profile Information</h1>
          <button className={styles["redBtn"]}>Edit Profile</button>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.ProfilePhotoContainer}>
            <img
              src={`${BaseURL}/img/users/${profile.photo}`}
              alt="my profile photo"
              className={styles.ProfilePhoto}
            />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{profile.name}</p>
            <p className={styles.userEmail}>Email: {profile.email}</p>
            <p className={styles.userDesc}>{profile.bio}</p>
          </div>
        </div>
        <section>
          <h1 className={styles.title}>Points</h1>
          <div className={styles.userPointContainer}>
            <div className={styles.mainPoints}>
              <p>ALL POINTS</p>
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
              <h5>{profile.points} Points</h5>
            </div>
            <div className={styles.categoryPoints}>
              <div className={`${styles.scubaDiving} ${styles.categoryItem}`}>
                <p>{"Scuba Diving".toUpperCase()}</p>
                <img src={scubaDivingImg} alt="scuba Diving Image" />
                <p>
                  {profile.activityPoints &&
                  profile.activityPoints.scubaDivingPoints
                    ? profile.activityPoints.scubaDivingPoints
                    : 0}
                  Points
                </p>
              </div>
              <div
                className={`${styles.whiteWaterRafting} ${styles.categoryItem}`}
              >
                <p>{"White Water Rafting".toUpperCase()}</p>
                <img src={whiteWaterRafting} alt="white water Image" />
                <p>
                  {profile.activityPoints &&
                  profile.activityPoints.whiteWaterRaftingPoints
                    ? profile.activityPoints.whiteWaterRaftingPoints
                    : 0}
                  Points
                </p>
              </div>
              <div className={`${styles.rockClimbing} ${styles.categoryItem}`}>
                <p>{"Rock Climbing".toUpperCase()}</p>
                <img src={rockClimbing} alt="rock climbing Image" />
                <p>
                  {profile.activityPoints &&
                  profile.activityPoints.rockClimbingPoints
                    ? profile.activityPoints.rockClimbingPoints
                    : 0}
                  Points
                </p>
              </div>
              <div
                className={`${styles.wildLifeSafari} ${styles.categoryItem}`}
              >
                <p>{"Wildlife Safari".toUpperCase()}</p>
                <img src={wildLifeSafari} alt="wild life safari Image" />
                <p>
                  {profile.activityPoints &&
                  profile.activityPoints.wildlifeSafariPoints
                    ? profile.activityPoints.wildlifeSafariPoints
                    : 0}
                  Points
                </p>
              </div>
              <div className={`${styles.trekking} ${styles.categoryItem}`}>
                <p>{"Trekking".toUpperCase()}</p>
                <img src={trekking} alt="trekking Image" />
                <p>
                  {profile.activityPoints &&
                  profile.activityPoints.trekkingPoints
                    ? profile.activityPoints.trekkingPoints
                    : 0}
                  Points
                </p>
              </div>
              <div className={`${styles.paragliding} ${styles.categoryItem}`}>
                <p>{"Paragliding".toUpperCase()}</p>
                <img src={paragliding} alt="paragliding Image" />
                <p>
                  {profile.activityPoints &&
                  profile.activityPoints.paraglidingPoints
                    ? profile.activityPoints.paraglidingPoints
                    : 0}
                  Points
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.title}>
            <h1>Badges</h1>
            <h2>These are just sample badges for demonstrate</h2>
          </div>
          <div className={styles.badges}>
            {badgeImages.map((badge, index) => (
              <img
                key={index}
                src={badge}
                alt={`Badge ${index + 1}`}
                className={styles.badge}
              />
            ))}
          </div>
        </section>
        <section>
          <div className={styles.participatedActivities}>
            <div className={styles.sectionHeading}>
              <h1>Recently Participated Adventures</h1>
            </div>
            <div className={styles.activity}>
              {bookings.map((activity, index) => (
                <div className={styles.activityItem} key={index}>
                  <img
                    src={`${BaseURL}/img/tours/${activity.tour.imageCover}`}
                    alt="activity image"
                    className={styles.activityImg}
                  />
                  <span className={styles.activityName}>
                    {activity.tour.name}
                  </span>
                  <span className={styles.activityCategoryType}>
                    {activity.categoryType.toUpperCase()}
                  </span>
                  <span className={styles.activityCity}>
                    {activity.tour.location.address}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyProfile;
