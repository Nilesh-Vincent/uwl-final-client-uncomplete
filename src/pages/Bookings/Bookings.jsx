import React, { useEffect, useState } from "react";
import styles from "./Bookings.module.css";
import axiosInstance from "../../utils/axiosInstance";
import BaseURL from "../../utils/BaseURL";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/bookings`)
      .then((response) => {
        setBookings(response.data.data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  function capitalizeAllWords(str) {
    const words = str.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }

  function splitOnCapitalWords(str) {
    return str.split(/(?=[A-Z])/).join(" ");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.bookingContainer}>
      <div className={styles.bookingItems} key={bookings.id}>
        <h1>My Bookings</h1>
        {bookings.map((booking) => {
          let bookingPointInfo = null;

          switch (booking.categoryType) {
            case "wildlife safari":
              bookingPointInfo = booking.wildlifeSafariInfo;
              break;
            case "rock climbing":
              bookingPointInfo = booking.rockClimbingInfo;
              break;
            case "paragliding":
              bookingPointInfo = booking.paraglidingInfo;
              break;
            case "trekking":
              bookingPointInfo = booking.trekkingInfo;
              break;
            case "white water rafting":
              bookingPointInfo = booking.whiteWaterRaftingInfo;
              break;
            case "scuba diving":
              bookingPointInfo = booking.scubaDivingInfo;
              break;
            default:
              break;
          }

          return (
            <div key={booking.id} className={styles.bookingItem}>
              <div className={styles.bookingImg}>
                <img
                  src={`${BaseURL}/img/tours/${booking.tour.imageCover}`}
                  alt="Booking"
                />
              </div>
              <div className={styles.bookingDetails}>
                <div className={styles.detailsLeft}>
                  <p>
                    <strong>Booking ID:</strong> {booking._id}
                  </p>
                  <p>
                    <strong>Tour:</strong> {booking.tour.name}
                  </p>
                  {booking.participated === false ? (
                    <p>
                      <strong>Participated:</strong> No
                    </p>
                  ) : (
                    <p>
                      <strong>Participated:</strong> Yes
                    </p>
                  )}
                  <p>
                    <strong>Points:</strong> {booking.points}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    {capitalizeAllWords(booking.status)}
                  </p>
                  {booking.paid === false ? (
                    <p>
                      <strong>Paid:</strong> No
                    </p>
                  ) : (
                    <p>
                      <strong>Paid:</strong> Yes
                    </p>
                  )}
                  <p>
                    <strong>Category:</strong>
                    {capitalizeAllWords(booking.categoryType)}
                  </p>
                </div>

                <div className={styles.detailsRight}>
                  {bookingPointInfo && (
                    <div>
                      <h4>
                        <strong>
                          {booking.categoryType.toUpperCase()} POINT INFORMATION
                        </strong>
                      </h4>
                      {Object.entries(bookingPointInfo).map(([key, value]) => (
                        <p key={key}>
                          <strong>
                            {splitOnCapitalWords(capitalizeAllWords(key))}:
                          </strong>{" "}
                          {value}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Bookings;
