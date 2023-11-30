import React, { useEffect, useState } from "react";
import styles from "./FeaturedCities.module.css";
import Galle from "../../../assets/CityImg/Galle.jpg";
import Kithulgala from "../../../assets/CityImg/Kithulgala.jpg";
import Kandy from "../../../assets/CityImg/Kandy.jpg";
import { useNavigate } from "react-router-dom";

const citiesData = [
  {
    imageSrc: Kithulgala,
    name: "Kithulgala",
    adventures: 45,
    latitude: 6.9818,
    longitude: 80.4036,
  },
  {
    imageSrc: Kandy,
    name: "Kandy",
    adventures: 65,
    latitude: 7.2906,
    longitude: 80.6337,
  },
  {
    imageSrc: Galle,
    name: "Galle",
    adventures: 78,
    latitude: 6.0328139,
    longitude: 80.214955,
  },
];

const FeaturedCities = () => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigateToCities = (city) => {
    setLatitude(city.latitude);
    setLongitude(city.longitude);
  };

  if (longitude !== null && latitude !== null) {
    navigate("/adventures", {
      state: { latitude, longitude },
    });
  }

  return (
    <>
      <div className={styles.sectionHeading}>
        <h1>Explore Our Top Cities For Adventure Activities.</h1>
        <h2>Most popular choices for adventure enthuaists from Sri Lanka</h2>
      </div>
      <div className={styles.featured}>
        {citiesData.map((city, index) => (
          <div
            className={styles.featuredItem}
            key={index}
            onClick={() => navigateToCities(city)}
          >
            <img
              src={city.imageSrc}
              alt={city.name}
              className={styles.featuredImg}
            />
            <div className={styles.featuredTitles}>
              <h1>{city.name}</h1>
              <h2>{city.adventures} Adventures</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedCities;
