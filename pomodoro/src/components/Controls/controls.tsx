import React, { useEffect } from "react";
import useSound from "use-sound";
import clickSfx from "../../sounds/slide.mp3";

export type TimerMode = "pomo" | "short" | "long";

interface ControlsProps {
  timerMode: TimerMode;
  setTimerMode: React.Dispatch<React.SetStateAction<TimerMode>>;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
  pomoLength: number;
  shortLength: number;
  longLength: number;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  volume: number;
}

const Controls: React.FC<ControlsProps> = ({
  timerMode,
  setTimerMode,
  setSecondsLeft,
  pomoLength,
  shortLength,
  longLength,
  setIsActive,
  setButtonText,
  volume,
}) => {
  const [playSfx] = useSound(clickSfx, { volume });

  useEffect(() => {
    // Update secondsLeft whenever timerMode changes
    switch (timerMode) {
      case "short":
        setSecondsLeft(shortLength * 60);
        break;
      case "long":
        setSecondsLeft(longLength * 60);
        break;
      default:
        setSecondsLeft(pomoLength * 60);
    }
  }, [timerMode, pomoLength, shortLength, longLength, setSecondsLeft]);

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.id as TimerMode;
    setTimerMode(newMode);
    setIsActive(false);
    setButtonText("START");
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    playSfx();
    event.preventDefault();
  };

  return (
    <form className="controls">
      <input
        type="radio"
        id="pomo"
        name="mode"
        checked={timerMode === "pomo"}
        onClick={handleClick}
        onChange={handleModeChange}
      />
      <label
        htmlFor="pomo"
        className={`controls__button ${timerMode === "pomo" ? "active" : ""}`}
      >
        FocusTime
      </label>

      <input
        type="radio"
        id="short"
        name="mode"
        checked={timerMode === "short"}
        onClick={handleClick}
        onChange={handleModeChange}
      />
      <label
        htmlFor="short"
        className={`controls__button ${timerMode === "short" ? "active" : ""}`}
      >
        shortbreak
      </label>

      <input
        type="radio"
        id="long"
        name="mode"
        checked={timerMode === "long"}
        onClick={handleClick}
        onChange={handleModeChange}
      />
      <label
        htmlFor="long"
        className={`controls__button ${timerMode === "long" ? "active" : ""}`}
      >
        longbreak
      </label>
    </form>
  );
};

export default Controls;
