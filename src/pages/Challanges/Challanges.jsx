import React from "react";
import styles from "./Challanges.module.css";
import { Line } from "rc-progress";
import trekkingImg from "../../assets/Trekking.svg";
import rockClimbingImg from "../../assets/rockClimbing.png";
import paraglidingImg from "../../assets/paragliding.svg";
import scubaDivingImg from "../../assets/scubaDiving.png";

const Challanges = () => {
  const chestImg =
    "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/ca23da57929a3144934ee0571a2f44e9.svg";

  const tasks = [
    {
      name: "Complete 5 Trekking Activities",
      points: 50,
      progress: 30,
      image: trekkingImg,
    },
    {
      name: "Complete 3 Scuba Diving Adventures",
      points: 30,
      progress: 10,
      image: scubaDivingImg,
    },
    {
      name: "Finish 10 Paragliding Flights",
      points: 100,
      progress: 70,
      image: paraglidingImg,
    },
    {
      name: "Explore 2 Rock Climbing Routes",
      points: 20,
      progress: 20,
      image: rockClimbingImg,
    },
  ];

  return (
    <div className={styles.challangesContainer}>
      <div className={styles.challangesItems}>
        <h1>Challanges</h1>
        <h2>Complete challenges to earn bonus points!</h2>
        {tasks.map((task, index) => (
          <div className={styles.taskItems} key={index}>
            <img
              src={task.image}
              alt="task image"
              className={styles.taskItemLeft}
            />
            <section className={styles.taskItemRight}>
              <h3>
                {task.name} to Earn {task.points} Points
              </h3>
              <div className={styles.progressBar}>
                <Line
                  percent={task.progress}
                  strokeWidth={4}
                  strokeColor="#ff5257"
                  trailWidth={4}
                  trailColor="lightgrey"
                />
                <img src={chestImg} alt="chest image" />
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challanges;
