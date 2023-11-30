import React, { useEffect, useState } from "react";
import styles from "./AdventureActivity.module.css";
import Maps from "../../components/Maps/Maps";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import BaseURL from "../../utils/BaseURL";
import axios from "axios";
import { Rating } from "react-simple-star-rating";

const AdventureActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentError, setPaymentError] = useState(null);
  const [bearerToken, setBearerToken] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState();
  const [reviews, setReviews] = useState([]);
  const [refreshReviews, setRefreshReviews] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setBearerToken(token);
  }, []);

  //console.log(`${BaseURL}/api/v1/bookings/checkout-session/${id}`);

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
  }, [id, reviews.length]);

  useEffect(() => {
    axiosInstance
      .get(`/reviews/tour/${id}`)
      .then((response) => {
        setReviews(response.data.data.reviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id, refreshReviews]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReview = async (event) => {
    event.preventDefault();

    try {
      const reviewValue = event.target.review.value;
      const response = await axiosInstance.post(`/reviews`, {
        review: reviewValue,
        rating: rating,
        tour: id,
      });

      setRefreshReviews(!refreshReviews);

      setReview("");
      setRating(0);

      console.log("Review posted:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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
  console.log(reviews);
  console.log(refreshReviews);

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
                <p>{activity.location?.address}</p>
              </div>
            </div>

            <div className={styles["adventureSummary"]}>
              {activity?.summary}{" "}
            </div>
          </div>
          <button className={styles["redBtn"]} onClick={paymentHandler}>
            Book Now
          </button>
        </div>
        <Link to={`/host/${activity.host?._id}`} key={activity.host?._id}>
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
                <h1>This Adventure Is Hosted By {activity.host?.name}</h1>
                <h2>More About {activity.host?.name}</h2>
              </div>
              <img
                src={`${BaseURL}/img/users/${activity.host?.photo}`}
                alt="Profile Picture"
                className={styles["hostProfilePhoto"]}
              />
            </div>
          </div>
        </Link>

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
          longitude={activity.location?.coordinates[0]}
          latitude={activity.location?.coordinates[1]}
        />
      </div>
      <div className={styles.review}>
        <h1>Reviews & Ratings</h1>

        <div className={styles.reviewItems}>
          <div className={styles.avgRating}>
            <p className={styles.avgRatingHeading}>Average Rating</p>
            <div className={styles.avgRatingStar}>
              <h3>{activity.ratingsAverage}.0</h3>
              <Rating
                initialValue={activity.ratingsAverage}
                allowHover={false}
              />
            </div>
            {activity.ratingsQuantity === 1 ||
            activity.ratingsQuantity === 0 ? (
              <p className={styles.ratingsQuantityHeading}>
                Based on {activity.ratingsQuantity} Rating
              </p>
            ) : (
              <p className={styles.ratingsQuantityHeading}>
                Based on {activity.ratingsQuantity} Ratings
              </p>
            )}
          </div>
          <div className={styles.addReview}>
            <p className={styles.addRatingHeading}>Add a Review</p>
            <Rating onClick={handleRating} size={27} initialValue={rating} />
            <form onSubmit={(event) => handleReview(event)}>
              <textarea
                id="review"
                name="review"
                rows="4"
                cols="50"
                value={review}
              ></textarea>
              <button>Submit Review</button>
            </form>
          </div>
        </div>
        <div className={styles.reviewList}>
          <h1>Review List</h1>
          {reviews.length == 0 && <p>No reviews at this moment</p>}
          {reviews.map((review) => (
            <div key={review.index} className={styles.reviewListItems}>
              <div className={styles.reviewListLeft}>
                <img
                  src={`${BaseURL}/img/users/${review.user.photo}`}
                  alt="User Profile Picture"
                  key={review.index}
                />
                <p key={review.index}>{review.user.name} </p>
              </div>
              <div className={styles.reviewListRight}>
                <p key={review.index} className={styles.reviewListRightDate}>
                  <b>Date: </b>
                  {new Date(review.createdAt).toString()}
                </p>
                <section className={styles.reviewListRightRating}>
                  <b>Rating: </b>
                  <Rating size={20} initialValue={review.rating} />
                </section>
                <p key={review.index} className={styles.reviewListRightReview}>
                  {review.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdventureActivity;
