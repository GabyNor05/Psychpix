import React, { useEffect } from "react";
import "../css/Login.css";
import LongLogo from "../../../pages/LongLogo.png";

import C from "./notes/C.mp3";
import Db from "./notes/Db.mp3";
import D from "./notes/D.mp3";
import Eb from "./notes/Eb.mp3";
import E from "./notes/E.mp3";
import F from "./notes/F.mp3";
import Gb from "./notes/Gb.mp3";
import G from "./notes/G.mp3";
import Ab from "./notes/Ab.mp3";
import A from "./notes/A.mp3";
import Bb from "./notes/Bb.mp3";
import B from "./notes/B.mp3";

const audioMap = {
  C: new Audio(C),
  Db: new Audio(Db),
  D: new Audio(D),
  Eb: new Audio(Eb),
  E: new Audio(E),
  F: new Audio(F),
  Gb: new Audio(Gb),
  G: new Audio(G),
  Ab: new Audio(Ab),
  A: new Audio(A),
  Bb: new Audio(Bb),
  B: new Audio(B),
};

// ✅ KEY → NOTE mapping for keyboard
const KEYBOARD_NOTE_MAP = {
  z: 'C',
  s: 'Db',
  x: 'D',
  d: 'Eb',
  c: 'E',
  v: 'F',
  g: 'Gb',
  b: 'G',
  h: 'Ab',
  n: 'A',
  j: 'Bb',
  m: 'B',
};

const SignUpStep2 = () => {
  const NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      const note = KEYBOARD_NOTE_MAP[e.key];
      if (note) playNote(note);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const playNote = (note) => {
    const audio = audioMap[note];
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const keyEl = document.querySelector(`[data-note="${note}"]`);
    if (keyEl) {
      keyEl.classList.add("active");
      setTimeout(() => keyEl.classList.remove("active"), 200); // visual feedback
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={LongLogo} alt="Logo" className="logo" />
      </div>
      <div className="piano">
        {NOTES.map((note) => (
          <div
            key={note}
            data-note={note}
            className={`key ${note.length === 1 ? "white" : "black"}`}
            onClick={() => playNote(note)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SignUpStep2;


