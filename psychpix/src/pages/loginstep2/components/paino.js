import React, { useEffect, useState } from "react";
import "../css/LogInStep2.css"; // Import CSS styles
import LongLogo from "../../../pages/LongLogo.png"; // Logo image

// Import piano note audio files
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

// Map notes to audio objects
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

// Keyboard key to note mapping
const KEYBOARD_NOTE_MAP = {
  z: "C", Z: "C",
  s: "Db", S: "Db",
  x: "D", X: "D",
  d: "Eb", D: "Eb",
  c: "E", C: "E",
  v: "F", V: "F",
  g: "Gb", G: "Gb",
  b: "G", B: "G",
  h: "Ab", H: "Ab",
  n: "A", N: "A",
  j: "Bb", J: "Bb",
  m: "B", M: "B",
};

// Y-positions of notes on the music staff
const NOTE_POSITIONS = {
  C: 90,
  Db: 87,
  D: 82,
  Eb: 79,
  E: 74,
  F: 69,
  Gb: 66,
  G: 61,
  Ab: 58,
  A: 53,
  Bb: 50,
  B: 45,
};

const INFO_TEXT = `Keyboard to Note:
z: C
s: Db
x: D
d: Eb
c: E
v: F
g: Gb
b: G
h: Ab
n: A
j: Bb
m: B`;

function Paino({ onBack, onSubmit, factorKeys, setFactorKeys }) {
  const NOTES = Object.keys(audioMap);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [infoOpen, setInfoOpen] = useState(false);

  // --- Move these ABOVE useEffect ---
  const playNote = (note) => {
    const audioSrc = {
      C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    }[note];
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    audio.volume = 1;
    audio.currentTime = 0;
    audio.play();

    setPressedKeys((prev) => [...prev, note]);

    // Highlight the key
    const keyEl = document.querySelector(`[data-note="${note}"]`);
    if (keyEl) {
      keyEl.classList.add("active");
      setTimeout(() => keyEl.classList.remove("active"), 200);
    }
  };

  const stopNote = (note) => {
    const audio = audioMap[note];
    if (!audio) return;

    let fadeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.01);
      } else {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fadeInterval);
      }
    }, 20);
  };

  const handleKey = (note) => {
    setFactorKeys(prev => {
      if (prev.length < 7) {
        return [...prev, note];
      }
      return prev;
    });
  };
  // --- End move ---

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      const note = KEYBOARD_NOTE_MAP[e.key];
      if (note) {
        playNote(note);
        handleKey(note);
      }
    };

    const handleKeyUp = (e) => {
      if (e.repeat) return;
      const note = KEYBOARD_NOTE_MAP[e.key];
      if (note) stopNote(note);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [playNote, handleKey, stopNote]);

  // Instead of local displayedNotes, use factorKeys/setFactorKeys
  const clearNotes = () => {
    setFactorKeys([]);
  };

  return (
    <div className="login-piano-container">
                  <div className="logo-container">
              <img src={LongLogo} alt="Logo" className="logo" />
            </div>
      <div className="auth-piano-box">


        {/* Info Button with Dropdown */}
        <div className={`info-dropdown-container${infoOpen ? " info-open" : ""}`}>
          {!infoOpen && (
            <button
              className="info-button"
              onClick={() => setInfoOpen(true)}
              aria-label="Show keyboard info"
              type="button"
            >
              i
            </button>
          )}
          {infoOpen && (
            <div className="info-dropdown">
              <pre>{INFO_TEXT}</pre>
              <button
                style={{
                  marginTop: "10px",
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setInfoOpen(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="piano-wrapper">
          <div className="music-sheet-container">
            {/* Music Sheet SVG */}
            <svg width="800" height="150" className="music-sheet">
              <text x="50" y="85" fontSize="60" fontFamily="serif">
                𝄞
              </text>
              {[0, 1, 2, 3, 4].map((line) => (
                <line
                  key={line}
                  x1="40"
                  y1={50 + line * 10}
                  x2="780"
                  y2={50 + line * 10}
                  stroke="black"
                  strokeWidth="1"
                />
              ))}
              {factorKeys.map((note, idx) => (
                <g key={idx}>
                  <circle
                    cx={110 + idx * 40}
                    cy={NOTE_POSITIONS[note]}
                    r="6"
                    fill="black"
                  />
                  <text
                    x={106 + idx * 40}
                    y={NOTE_POSITIONS[note] + 20}
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {note}
                  </text>
                </g>
              ))}
            </svg>

            {/* Clear Button beside music sheet */}
            <button onClick={clearNotes} className="auth-button clear-button">
              Clear
            </button>
          </div>

          {/* Piano Keys */}
          <div className="piano">
            {NOTES.map((note) => (
              <div
                key={note}
                data-note={note}
                className={`key ${note.length === 1 ? "white" : "black"}`}
                onClick={() => {
                  playNote(note);
                  handleKey(note);
                }}
              >
                <span className="note-label">{note}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          className="auth-button submit-button"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Paino;
