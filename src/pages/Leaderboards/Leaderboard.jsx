import React from "react";
import styles from "./Leaderboard.module.css";
import user1 from "../../assets/LeaderboardImg/1.jpg";
import user2 from "../../assets/LeaderboardImg/2.jpg";
import user3 from "../../assets/LeaderboardImg/3.jpg";
import user4 from "../../assets/LeaderboardImg/4.jpg";
import user5 from "../../assets/LeaderboardImg/5.jpg";
import user6 from "../../assets/LeaderboardImg/6.jpg";
import user7 from "../../assets/LeaderboardImg/7.jpg";
import user8 from "../../assets/LeaderboardImg/8.jpg";
import user9 from "../../assets/LeaderboardImg/9.jpg";
import user10 from "../../assets/LeaderboardImg/10.jpg";

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: "Sarah Doe", score: 100, image: user1 },
    { rank: 2, name: "Jane Williams", score: 90, image: user2 },
    { rank: 3, name: "Mark Wood", score: 85, image: user3 },
    { rank: 4, name: "Oliver Miller", score: 80, image: user4 },
    { rank: 5, name: "Mike Brown", score: 75, image: user5 },
    { rank: 6, name: "Sophie Wilson", score: 70, image: user6 },
    { rank: 7, name: "Chris Davis", score: 65, image: user7 },
    { rank: 8, name: "Emily Taylor", score: 60, image: user8 },
    { rank: 9, name: "Nilesh Vincent", score: 55, image: user9 },
    { rank: 10, name: "Jacob Anderson", score: 50, image: user10 },
  ];

  const leagueImg =
    "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/192181672ada150becd83a74a4266ae9.svg";

  return (
    <div className={styles.leaderboardContainer}>
      <section className={styles.leaderboardItems}>
        <h1>LEADERBOARDS</h1>
        <div className={styles.leaderboardCategories}>
          <div
            className={`${styles.leaderboardCategory} ${styles.leaderboardCategoryRed}`}
          >
            All Users
          </div>
          <div className={styles.leaderboardCategory}>Friends</div>
          <div className={styles.leaderboardCategory}>By Category</div>
        </div>
        <div className={styles.leagueImg}>
          <img src={leagueImg} alt="league icon" />
        </div>
        <div className={styles.leagueTitles}>
          <h1>Bronze League</h1>
          <h2>Join the competition and climb the ranks!</h2>
        </div>
        <div className={styles.leaderboard}>
          <div className={styles.leaderBoardHeader}>
            <span className={styles.LBRankHeading}>Rank</span>
            <span className={styles.LBNameHeading}>Name</span>
            <span className={styles.LBScoreHeading}>Score</span>
          </div>
          <div className={styles.leaderBoardItems}>
            {leaderboardData.map((item) => (
              <div
                key={item.rank}
                className={`${styles.leaderBoardItem} ${
                  item.name === "Nilesh Vincent" ? styles.highlightedItem : ""
                }`}
              >
                <div className={styles.LBrank}>{item.rank}</div>
                <div className={styles.leaderboardUser}>
                  <img src={item.image} alt="User Image" />
                  <div> {item.name}</div>
                </div>

                <div className={styles.LBScore}>{item.score}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
