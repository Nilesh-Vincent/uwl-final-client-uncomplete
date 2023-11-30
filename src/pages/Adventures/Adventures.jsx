import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./Adventures.module.css";
import BaseURL from "../../utils/BaseURL";

const Adventures = () => {
  const location = useLocation();

  const [loading, setLoading] = useState();
  const [latitude, setLatitude] = useState(location.state.latitude);
  const [longitude, setLongitude] = useState(location.state.longitude);
  const [category, setCategory] = useState(
    location.state.options || "Every Adventure"
  );
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(10);
  const [minRatingsAverage, setMinRatingsAverage] = useState(0);
  const [maxRatingsAverage, setMaxRatingsAverage] = useState(5);
  const [sortOpt, setSortOpt] = useState("-price");
  const [difficulty, setDifficulty] = useState(
    "difficulty=easy&difficulty=medium"
  );
  const [activitiesData, setActivitiesData] = useState([]);

  console.log(latitude);
  console.log(longitude);

  let startingUrl = "/tours";
  if (latitude !== null && longitude !== null) {
    startingUrl = `/tours/tours-within/10/center/${latitude},${longitude}/unit/mi`;
  }

  let CategoryType;
  if (category == "scuba diving") {
    CategoryType = "&categoryType=scuba diving";
  } else if (category == "wildlife safari") {
    CategoryType = "&categoryType=wildlife safari";
  } else if (category == "paragliding") {
    CategoryType = "&categoryType=paragliding";
  } else if (category == "trekking") {
    CategoryType = "&categoryType=trekking";
  } else if (category == "rock climbing") {
    CategoryType = "&categoryType=rock climbing";
  } else if (category == "white water rafting") {
    CategoryType = "&categoryType=white water rafting";
  } else {
    CategoryType = "&";
  }

  useEffect(() => {
    console.log("Cat type Is");

    console.log(CategoryType);
  }, [CategoryType]);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      // .get(
      //   `/tours/tours-within/10/center/${latitude},${longitude}/unit/mi?price[lte]=${maxPrice}&price[gte]=${minPrice}&duration[lte]=${maxDuration}&duration[gte]=${minDuration}&ratingsAverage[lte]=${maxRatingsAverage}.0&ratingsAverage[gte]=${minRatingsAverage}&sort=${sortOpt}&${difficulty}`
      // )
      .get(
        `${startingUrl}?price[lte]=${maxPrice}&price[gte]=${minPrice}&duration[lte]=${maxDuration}&duration[gte]=${minDuration}&ratingsAverage[lte]=${maxRatingsAverage}.0&ratingsAverage[gte]=${minRatingsAverage}&sort=${sortOpt}&${difficulty}${CategoryType}`
      )
      .then((response) => {
        setActivitiesData(response.data.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [
    latitude,
    longitude,
    location.state,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    minRatingsAverage,
    maxRatingsAverage,
    sortOpt,
    difficulty,
    category,
  ]);

  return (
    <div className={styles.searchListContainer}>
      <div className={styles.searchListItems}>
        <section className={styles.sideBarFilter}>
          <h1>Filter Result</h1>
          <div className={styles.sideBarItem}>
            <label htmlFor="minPrice">Minimum Price</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
          </div>
          <div className={styles.sideBarItem}>
            <label htmlFor="maxPrice">Maximum Price</label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </div>
          <div className={styles.sideBarItem}>
            <label htmlFor="maxDuration">Maximum Duration</label>
            <select
              id="maxDuration"
              value={maxDuration}
              onChange={(event) => setMaxDuration(event.target.value)}
            >
              <option value={10}>Any Duration</option>
              <option value={10}>10 Hours</option>
              <option value={0.3}>30 Minutes</option>
              <option value={1}>1 Hours</option>
              <option value={2}>2 Hours</option>
              <option value={3}>3 Hours</option>
              <option value={4}>4 Hours</option>
              <option value={5}>5 Hours</option>
              <option value={6}>6 Hours</option>
              <option value={7}>7 Hours</option>
              <option value={8}>8 Hours</option>
              <option value={9}>9 Hours</option>
            </select>
          </div>
          <div className={styles.sideBarItem}>
            <label htmlFor="minDuration">Minimum Duration</label>
            <select
              id="minDuration"
              value={minDuration}
              onChange={(event) => setMinDuration(event.target.value)}
            >
              <option value={0.3}>Any Duration</option>
              <option value={0.3}>30 Minutes</option>
              <option value={1}>1 Hours</option>
              <option value={2}>2 Hours</option>
              <option value={3}>3 Hours</option>
              <option value={4}>4 Hours</option>
              <option value={5}>5 Hours</option>
              <option value={6}>6 Hours</option>
              <option value={7}>7 Hours</option>
              <option value={8}>8 Hours</option>
              <option value={9}>9 Hours</option>
              <option value={10}>10 Hours</option>
            </select>
          </div>
          <div className={styles.sideBarItem}>
            <label htmlFor="minRatingsAverage">Min Ratings Average</label>
            <select
              id="minRatingsAverage"
              value={minRatingsAverage}
              onChange={(event) => setMinRatingsAverage(event.target.value)}
            >
              <option value={0}>Any Average</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className={styles.sideBarItem}>
            <label htmlFor="maxRatingsAverage">Max Ratings Average</label>
            <select
              id="maxRatingsAverage"
              value={maxRatingsAverage}
              onChange={(event) => setMaxRatingsAverage(event.target.value)}
            >
              <option value={5}>Any Average</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className={styles.sideBarItem}>
            <label htmlFor="sortOpt">Sort by Price</label>
            <select
              id="sortOpt"
              value={sortOpt}
              onChange={(event) => setSortOpt(event.target.value)}
            >
              <option value="-price">High to Low</option>
              <option value="price">Low to High</option>
            </select>
          </div>
          <div className={styles.sideBarItem}>
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="difficulty=easy&difficulty=medium">
                Any Difficulty
              </option>
              <option value="difficulty=easy">Easy</option>
              <option value="difficulty=medium">Medium</option>
              <option value="difficulty=hard">Hard</option>
            </select>
          </div>
        </section>
        {loading && <h1 className={styles.adventureItems}>Loading...</h1>}

        {!loading && activitiesData.length > 0 && (
          <section className={styles.adventureItems}>
            <h1 className={styles.itemHeader}>
              Places According to your location & category
            </h1>
            {activitiesData.map((adventure, index) => (
              <Link to={`/adventure/${adventure._id}`} key={adventure.id}>
                <div key={index} className={styles.adventureItem}>
                  <div className={styles.imageContainer}>
                    <img
                      src={`${BaseURL}/img/tours/${adventure.imageCover}`}
                      alt="adventure image"
                      className={styles.adventureImg}
                    />
                  </div>
                  <div className={styles.adventureInformation}>
                    <h2 className={styles.adventureName}>{adventure.name}</h2>
                    <div className={styles.adventurePriceRating}>
                      <span>
                        <strong>Price: </strong>
                        {`$${adventure.price}`}
                      </span>
                      <div className={styles.ratingItems}>
                        <div>
                          <h4>Wonderfull</h4>
                          <p>Reviews: {adventure.ratingsQuantity}</p>
                        </div>
                        <span className={styles.ratingComponent}>
                          {adventure.ratingsAverage}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className={styles.adventureDifficulty}>
                        <strong>Difficulty: </strong>
                        {adventure.difficulty}
                      </p>
                    </div>
                    <div>
                      <p className={styles.adventureLocation}>
                        <strong>location: </strong>
                        {adventure.location.description}
                      </p>
                    </div>
                    <p className={styles.adventureSummary}>
                      {adventure.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
        {!loading && activitiesData.length == 0 && (
          <h1>There is no any adventures to this search query.</h1>
        )}
      </div>
    </div>
  );
};

export default Adventures;
