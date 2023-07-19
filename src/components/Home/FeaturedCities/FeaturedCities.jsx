import React from "react";
import styles from "./FeaturedCities.module.css";
import Galle from "../../../assets/CityImg/Galle.jpg";
import Kithulgala from "../../../assets/CityImg/Kithulgala.jpg";
import Kandy from "../../../assets/CityImg/Kandy.jpg";

const citiesData = [
  {
    imageSrc: Kithulgala,
    name: "Kithulgala",
    adventures: 45,
  },
  {
    imageSrc: Kandy,
    name: "Kandy",
    adventures: 65,
  },
  {
    imageSrc: Galle,
    name: "Galle",
    adventures: 78,
  },
];

const FeaturedCities = () => {
  return (
    <>
      <div className={styles.sectionHeading}>
        <h1>EXPLORE OUR TOP CITIES FOR ADVENTURE TRAVEL</h1>
        <h2>Most popular choices for adventure enthuaists from Sri Lanka</h2>
      </div>

      <div className={styles.featured}>
        {citiesData.map((city, index) => (
          <div className={styles.featuredItem} key={index}>
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
