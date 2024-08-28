import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Controls, { TimerMode } from "./components/Controls/controls";
import TimerDisplay from "./components/TimerDisplay/timerdisplay";
import Button from "./components/Button/button";
import Settings from "./components/Settings/settings";
import useSound from "use-sound";
import timesUpSfx from "./sounds/timesUp.mp3";

// Define types for the state variables
//type FontPref = "kumbh" | "roboto" | "space";
//type AccentColor = "default" | "blue" | "purple";

const App: React.FC = () => {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<TimerMode>("pomo");
  const [pomoLength, setPomoLength] = useState<number>(25);
  const [shortLength, setShortLength] = useState<number>(3);
  const [longLength, setLongLength] = useState<number>(15);
  const [fontPref, setFontPref] = useState<any>("kumbh");
  const [accentColor, setAccentColor] = useState<any>("default");
  const [secondsLeft, setSecondsLeft] = useState<number>(pomoLength * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("START");
  const [volume, setVolume] = useState<number>(1);

  const [timesUp] = useSound(timesUpSfx, { volume });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        clearInterval(interval);
        setIsActive(false);
        setButtonText("");
        timesUp();
      }

      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft, timesUp]);

  const toggleSettingsVisibility = () => {
    setSettingsVisible((prev) => !prev);
  };

  const formatTimeLeft = (seconds: number): string => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`;
  };

  const calcPercentage = (): number => {
    switch (timerMode) {
      case "pomo":
        return (secondsLeft / (pomoLength * 60)) * 100;
      case "short":
        return (secondsLeft / (shortLength * 60)) * 100;
      case "long":
        return (secondsLeft / (longLength * 60)) * 100;
      default:
        return 0;
    }
  };

  return (
    <div className="pomodoro-app">
      <Header title="Pomodoro" />
      <Controls
        timerMode={timerMode}
        setTimerMode={setTimerMode}
        setSecondsLeft={setSecondsLeft}
        pomoLength={pomoLength}
        shortLength={shortLength}
        longLength={longLength}
        setIsActive={setIsActive}
        setButtonText={setButtonText}
        volume={volume}
      />
      <TimerDisplay
        timerMode={timerMode}
        percentage={calcPercentage()}
        timeLeft={formatTimeLeft(secondsLeft)}
        isActive={isActive}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
        volume={volume}
        setVolume={setVolume}
      />
      <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      <Settings
        visible={settingsVisible}
        toggleSettingsVisibility={toggleSettingsVisibility}
        pomoLength={pomoLength}
        setPomoLength={setPomoLength}
        shortLength={shortLength}
        setShortLength={setShortLength}
        longLength={longLength}
        setLongLength={setLongLength}
        fontPref={fontPref}
        setFontPref={setFontPref}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        closeSettings={toggleSettingsVisibility}
        setSecondsLeft={setSecondsLeft}
        timerMode={timerMode}
      />
    </div>
  );
};

export default App;
