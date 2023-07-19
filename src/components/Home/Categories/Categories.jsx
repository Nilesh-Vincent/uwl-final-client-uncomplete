import React from "react";
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
  return (
    <>
      <div className={styles.sectionHeading}>
        <h1 className={styles.sectionHeading__h1}>
          EXPLORE ADVENTURES BY CATEGORY
        </h1>
        <h2 className={styles.sectionHeading__h2}>
          Most popular choices for adventure enthuaists from Sri Lanka
        </h2>
      </div>

      <div className={styles.activities}>
        {citiesData.map((city, index) => (
          <div className={styles.activityCategory} key={index}>
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
