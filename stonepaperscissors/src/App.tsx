import React, { useState } from "react";
import Header from "./components/Header/Header";
import Play from "./components/Play/Play";
import Game from "./components/Game/Game";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [myChoice, setMyChoice] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  return (
    <>
      <div className="container">
        <Header score={score} />
        <Routes>
          <Route path="/" element={<Play setMyChoice={setMyChoice} />} />
          <Route
            path="/game"
            element={
              <Game myChoice={myChoice} score={score} setScore={setScore} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
