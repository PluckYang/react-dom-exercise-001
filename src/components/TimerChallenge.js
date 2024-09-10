import { useState, useRef } from "react";
import ResultModal from "./ResultModal.js";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const dialog = useRef();
  const timer = useRef();

  function handleStart() {
    setTimerStarted(true);

    timer.current = setTimeout(() => {
      //setTimeout为JS函数，在倒计时（毫秒）后执行函数
      setTimerExpired(true);

      dialog.current.showModal();
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer.current); //JS函数，打断setTimeout的计时，为了确认执行目标，先setTimeout传递给变数
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is Running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
