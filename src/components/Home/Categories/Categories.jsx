import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Categories.module.css";

import ScubaDiving from "../../../assets/CategoryImg/scuba-diving.jpg";
import Trekking from "../../../assets/CategoryImg/Trekking.jpg";
import Paragliding from "../../../assets/CategoryImg/Paragliding.jpeg";
import rockClimbing from "../../../assets/CategoryImg/rockClimbing.jpg";
import Safari from "../../../assets/CategoryImg/Safari.jpg";
import whiteWaterRafting from "../../../assets/CategoryImg/whiteWaterRafting.jpg";

const citiesData = [
  {
    imageSrc: ScubaDiving,
    name: "Scuba Diving",
    adventures: 45,
  },
  {
    imageSrc: Trekking,
    name: "Trekking",
    adventures: 65,
  },
  {
    imageSrc: Paragliding,
    name: "Paragliding",
    adventures: 78,
  },
  {
    imageSrc: rockClimbing,
    name: "Rock Climbing",
    adventures: 45,
  },
  {
    imageSrc: Safari,
    name: "Safari",
    adventures: 65,
  },
  {
    imageSrc: whiteWaterRafting,
    name: "White Water Rafting",
    adventures: 78,
  },
];

const Categories = () => {
  const [options, setOptions] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();

  const navigateToCategories = (city) => {
    setOptions(city.name.toLowerCase());
    console.log(options);
  };

  if (options !== null) {
    navigate("/adventures", {
      state: { latitude, longitude, options },
    });
  }

  return (
    <>
      <div className={styles.sectionHeading}>
        <h1 className={styles.sectionHeading__h1}>
          Explore Adventures By Category
        </h1>
        <h2 className={styles.sectionHeading__h2}>
          Most popular choices for adventure enthuaists from Sri Lanka
        </h2>
      </div>

      <div className={styles.activities}>
        {citiesData.map((city, index) => (
          <div
            className={styles.activityCategory}
            key={index}
            onClick={() => {
              navigateToCategories(city);
            }}
          >
            <img
              src={city.imageSrc}
              alt={city.name}
              className={styles.CategoryImg}
            />
            <div className={styles.CategoryTitles}>
              <h1>{city.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
