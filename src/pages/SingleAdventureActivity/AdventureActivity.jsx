import React, { useEffect, useState } from "react";
import styles from "./AdventureActivity.module.css";
import Maps from "../../components/Maps/Maps";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import BaseURL from "../../utils/BaseURL";
import axios from "axios";
import Cookies from "js-cookie";

const AdventureActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentError, setPaymentError] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt");
    setBearerToken(token);
  }, []);

  console.log(`${BaseURL}/api/v1/bookings/checkout-session/${id}`);

  const paymentHandler = async (event) => {
    event.preventDefault();
    setPaymentError(null);

    // Fetch the payment session ID from the backend
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/bookings/checkout-session/${id}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const sessionId = response.data.session.id;

      // Initialize Stripe
      const stripe = window.Stripe(
        "pk_test_zmJoW05zfIcY2zvHKEBLxtKl00S9hFMb5i"
      );

      // Create a payment form
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        setPaymentError(error.message);
      }
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/tours/${id}`)
      .then((response) => {
        setActivity(response.data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  let photos = [];
  if (activity.length !== 0) {
    photos = [
      {
        src: `${BaseURL}/img/tours/${activity.imageCover}`,
      },
      {
        src: `${BaseURL}/img/tours/${activity.images[0]}`,
      },
      {
        src: `${BaseURL}/img/tours/${activity.images[1]}`,
      },
      {
        src: `${BaseURL}/img/tours/${activity.images[2]}`,
      },
    ];
  }

  console.log(activity);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles["adventureActivityContainer"]}>
      <div className={styles["adventureActivityItems"]}>
        <div className={styles["startingItems"]}>
          <div>
            <h1 className={styles["adventureTitle"]}>{activity.name}</h1>

            <div className={styles["adventureAddress"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={styles["locationIcon"]}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <div>
                <p>{activity.location.address}</p>
              </div>
            </div>

            <div className={styles["adventureSummary"]}>
              {activity.summary}{" "}
            </div>
          </div>
          <button className={styles["redBtn"]} onClick={paymentHandler}>
            Book Now
          </button>
        </div>

        <div className={styles["adventureImages"]}>
          {photos.map((photo, i) => (
            <div className={styles["adventureImgWrapper"]} key={i}>
              <img
                src={photo.src}
                alt="host profile picture"
                className={styles["adventureImg"]}
              />
            </div>
          ))}

          <div className={styles["hostInfo"]}>
            <div className={styles["hostInfoText"]}>
              <h1>This Adventure Is Hosted By {activity.host.name}</h1>
              <h2>More About {activity.host.name}</h2>
            </div>
            <img
              src={`${BaseURL}/img/users/${activity.host.photo}`}
              alt="Profile Picture"
              className={styles["hostProfilePhoto"]}
            />
          </div>

          <div className={styles["adventureDetails"]}>
            <div className={styles["adventureDetailsTexts"]}>
              <h1 className={styles["adventureTitle"]}>{activity.name}</h1>
              <p className={styles["adventureDesc"]}>{activity.description}</p>
            </div>
            <div className={styles["adventureDetailsPrice"]}>
              <h1>Perfect Adventure </h1>
              <span>
                Secure your adventure now! Book via Stripe, earn points, and
                embark on an unforgettable experience.
              </span>
              <h2>
                <b>${activity.price}</b>
              </h2>
              <button onClick={paymentHandler}>Reserve or Book Now</button>
              {paymentError && <div>{paymentError}</div>}
            </div>
          </div>
        </div>
        <div className={styles.location}>
          <h1> Location of the Adventure</h1>
          <Maps
            longitude={activity.location.coordinates[0]}
            latitude={activity.location.coordinates[1]}
          />
        </div>
      </div>
    </main>
  );
};

export default AdventureActivity;
