import React from "react";
import styles from "./Challanges.module.css";

const Challanges = () => {
  const tasks = [
    { name: "Complete 5 Trekking Activities", points: 50, progress: 3 },
    { name: "Attend 3 Rafting Adventures", points: 30, progress: 1 },
    { name: "Finish 10 Cycling Tours", points: 100, progress: 7 },
    { name: "Explore 2 Rock Climbing Routes", points: 20, progress: 2 },
  ];

  const calculateProgressPercentage = (progress, total) => {
    return (progress / total) * 100;
  };

  return (
    <div className={styles.challangesContainer}>
      <div className={styles.challangesItems}>
        <h1>Challanges</h1>
        <div className={styles.taskList}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <div className={styles.taskName}>{task.name}</div>
                <div className={styles.taskPoints}>{task.points} Points</div>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{
                    width: `${calculateProgressPercentage(
                      task.progress,
                      task.total
                    )}%`,
                  }}
                ></div>
              </div>
              <div className={styles.taskProgress}>
                {task.progress} / {task.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challanges;
