import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  // а зачем здесь объявлять сотояние, можно же просто работать с массивом data
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);

  let onFirstStep = activeIndex === 0;
  let onLastStep = activeIndex === steps.length - 1;

  const nextStep = () => {
    setActiveIndex((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveIndex((prev) => prev - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles["steps-list"]}>
            {steps.map(({ id, title }, index) => {
              let className = styles["steps-item"];

              if (index === activeIndex) {
                className += " " + styles.done + " " + styles.active;
              } else if (index < activeIndex) {
                className += " " + styles.done;
              }

              return (
                <li key={id} className={className}>
                  <button
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                    className={styles["steps-item-button"]}
                  >
                    {index + 1}
                  </button>
                  {title}
                </li>
              );
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              onClick={prevStep}
              className={styles.button}
              disabled={onFirstStep}
            >
              Назад
            </button>
            {onLastStep && (
              <button
                onClick={() => setActiveIndex(0)}
                className={styles.button}
              >
                Начать сначала
              </button>
            )}
            {!onLastStep && (
              <button onClick={nextStep} className={styles.button}>
                Далее
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
