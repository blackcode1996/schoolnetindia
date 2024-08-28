import React from "react";
import MuteToggle from "../MuteToggle/mutetoggle";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useSound from "use-sound";
import startSfx from "../../sounds/startTimer.mp3";
import pauseSfx from "../../sounds/pauseTimer.mp3";

// Define the interface for the props
interface TimerDisplayProps {
  timerMode: "pomo" | "short" | "long"; // Specify the possible values for timerMode
  percentage: number;
  timeLeft: string;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  buttonText: string;
  setButtonText: (text: string) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timerMode,
  percentage,
  timeLeft,
  isActive,
  setIsActive,
  buttonText,
  setButtonText,
  volume,
  setVolume,
}) => {
  const [play] = useSound(startSfx, {
    interrupt: true,
    volume: volume,
  });
  const [pause] = useSound(pauseSfx, {
    interrupt: true,
    volume: volume,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    // Prevent default action for the mute button
    if ((event.target as HTMLButtonElement).id === "muteButton") {
      return;
    }

    if (timeLeft === "0:00") {
      return;
    }

    if (isActive) {
      pause();
    } else {
      play();
    }
    setIsActive(!isActive);
    setButtonText(
      buttonText === "START" || buttonText === "RESUME" ? "PAUSE" : "RESUME"
    );
  };

  const timesUpMsg = timerMode === "pomo" ? "time for a break" : "back to work!";

  const timeText = timeLeft === "0:00" ? timesUpMsg : timeLeft;

  const textSize = timeLeft === "0:00" ? "12px" : "28px";

  return (
    <div className="timer" onClick={handleClick}>
      <div className="timer__display">
        <CircularProgressbarWithChildren
          value={percentage}
          text={timeText}
          strokeWidth={4}
          styles={buildStyles({
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors & Fonts
            pathColor: "var(--accent-color)",
            textColor: "var(--text)",
            textSize: textSize,
            trailColor: "none",
          })}
        >
          <MuteToggle volume={volume} setVolume={setVolume} />
          <button className="display__start-pause" onClick={handleClick}>
            {buttonText}
          </button>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default TimerDisplay;
