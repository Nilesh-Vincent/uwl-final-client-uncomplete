import React from "react";
import styles from "./Home.module.css";
import FeaturedCities from "../../components/Home/FeaturedCities/FeaturedCities";
import FeaturedActivities from "../../components/Home/FeaturedActivities/FeaturedActivities";
import Categories from "../../components/Home/Categories/Categories";
import NewsLetter from "../../components/Home/NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeItems}>
        <FeaturedCities />
        <FeaturedActivities />
        <Categories />
        <NewsLetter />
      </div>
    </div>
  );
};

export default Home;
