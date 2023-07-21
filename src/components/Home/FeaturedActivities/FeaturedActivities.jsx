import React, { useState, useEffect } from "react";
import styles from "./FeaturedActivities.module.css";
import axiosInstance from "../../../utils/axiosInstance";
import BaseURL from "../../../utils/BaseURL";
import { Link } from "react-router-dom";

const FeaturedActivities = () => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/tours?limit=8")
      .then((response) => {
        setActivitiesData(response.data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  console.log(activitiesData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.sectionHeading}>
        <h1>Trending Adventures</h1>
        <h2>Most popular choices for adventure enthusiasts from Sri Lanka</h2>
      </div>
      <div className={styles.activity}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          activitiesData.map((activity) => (
            <div className={styles.activityItem} key={activity.id}>
              <Link to={`/adventure/${activity._id}`} key={activity.id}>
                <img
                  src={`${BaseURL}/img/tours/${activity.imageCover}`}
                  alt="activity image"
                  className={styles.activityImg}
                />
                <section className={styles.activityInfo}>
                  <span className={styles.activityName}>{activity.name}</span>
                  <span className={styles.activityCategoryType}>
                    {`${activity.categoryType}`.toUpperCase()}
                  </span>
                  <span className={styles.activityCity}>
                    {activity.location.description}
                  </span>
                  <span className={styles.activityPrice}>
                    <p>
                      <strong>Price:</strong> {`${activity.price} Hours`}
                    </p>
                  </span>
                  <span className={styles.activityDuration}>
                    <p>
                      <strong>Duration:</strong> {`${activity.duration} Hours`}
                    </p>
                  </span>
                </section>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FeaturedActivities;
