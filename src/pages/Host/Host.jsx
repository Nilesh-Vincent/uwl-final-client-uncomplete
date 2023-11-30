import React, { useState, useEffect } from "react";
import styles from "./Host.module.css";
import axiosInstance from "../../utils/axiosInstance";
import BaseURL from "../../utils/BaseURL";
import { useParams, Link } from "react-router-dom";

const Host = () => {
  const { hostId } = useParams();

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/tours/host/${hostId}`)
      .then((response) => {
        setProfile(response.data.data.tours);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  console.log(profile);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.myProfileContainer}>
      <div className={styles.myProfileItems}>
        <div className={styles.profileHeader}>
          <h1 className={styles.title}>Profile Information</h1>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.ProfilePhotoContainer}>
            <img
              src={`${BaseURL}/img/users/${profile[0].host.photo}`}
              alt="my profile photo"
              className={styles.ProfilePhoto}
            />
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{profile[0].host.name}</p>
            <p className={styles.userEmail}>Email: {profile[0].host.email}</p>
            <p className={styles.userDesc}>{profile[0].host.bio}</p>
          </div>
        </div>
        <section>
          <div className={styles.participatedActivities}>
            <div className={styles.sectionHeading}>
              <h1>Adventures Activities By Host</h1>
            </div>
            <div className={styles.activity}>
              {profile.map((activity, index) => (
                <div className={styles.activityItem} key={index}>
                  <Link to={`/adventure/${activity._id}`} key={activity.id}>
                    <img
                      src={`${BaseURL}/img/tours/${activity.imageCover}`}
                      alt="activity image"
                      className={styles.activityImg}
                    />
                    <section className={styles.activityInfo}>
                      <span className={styles.activityName}>
                        {activity.name}
                      </span>
                      <span className={styles.activityCategoryType}>
                        {`${activity.categoryType}`.toUpperCase()}
                      </span>
                      <span className={styles.activityCity}>
                        {activity.location.description}
                      </span>
                      <span className={styles.activityPrice}>
                        <p>
                          <strong>Price:</strong> {`$${activity.price}.00`}
                        </p>
                      </span>
                      <span className={styles.activityDuration}>
                        <p>
                          <strong>Duration:</strong>{" "}
                          {`${activity.duration} Hours`}
                        </p>
                      </span>
                    </section>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Host;
