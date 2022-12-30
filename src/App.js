import "./App.css";
import React, { useState, useEffect } from "react";
import Clock from "./Components/Clock";
import Confetti from 'react-confetti'
import song from './assets/bell.mp3'
import tick from './assets/tick.mp3'
import avaria from './assets/avaria.mp3'

function App() {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [toggle, setToggle] = useState(false);
  const [counter, setCounter] = useState(0);
  
  const lastTwelveSeconds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  let interval;

  const startTimer = () => {
    const countDownDate = new Date(2022, 11, 31, 2, 10, 0).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        // Stop Timer
        setToggle(true);
        clearInterval(interval.current);

      } else {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  const playMainTheme = () => {
    const kurant = new Audio(song)
    kurant.play();
    setTimeout(() => {
      const disco = new Audio(avaria)
      disco.play()
    }, 42000)
  }

  const playTick = () => {
    new Audio(tick).play()
  }

  useEffect(() => {
    startTimer();
  });
  useEffect(() => {
    if (toggle) {
      playMainTheme();
    }
  }, [toggle]);

  useEffect(() => {
    if (timerDays === 0
      && timerHours === 0
      && timerMinutes === 0
      && lastTwelveSeconds.includes(timerSeconds)
      ) {
      console.log('timerSeconds', timerSeconds)
      playTick()
    }
  }, [timerDays, timerHours, timerMinutes, timerSeconds]);

  return (
    <div className="App">
      <Clock
        timerDays={timerDays}
        timerHours={timerHours}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
      />

      <button className="button" onClick={() => setCounter((prev) => prev + 1)}>
        Click this button once
      </button>

      {toggle && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )
      }

    </div>
  );
}

export default App;
