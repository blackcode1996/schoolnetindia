import React from "react";
import { Link } from "react-router-dom";
import Triangle from "../../assets/bg-triangle.svg";
import "./Play.css"

interface PlayProps {
  setMyChoice: (choice: string) => void;
}

const Play: React.FC<PlayProps> = ({ setMyChoice }) => {
  const setChoice = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    setMyChoice(target.dataset.id || "");
  };

  return (
    <div className="play">
      <img src={Triangle} alt="Background Triangle" className="triangle" />
      <div className="items">
        <Link to="/game">
          <div
            data-id="paper"
            onClick={setChoice}
            className="icon icon--paper"
          ></div>
        </Link>
        <Link to="/game">
          <div
            data-id="scissors"
            onClick={setChoice}
            className="icon icon--scissors"
          ></div>
        </Link>
        <Link to="/game">
          <div
            data-id="rock"
            onClick={setChoice}
            className="icon icon--rock"
          ></div>
        </Link>
      </div>
    </div>
  );
};

export default Play;
