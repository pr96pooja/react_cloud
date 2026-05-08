import "./App.css";
import { useEffect, useState } from "react";

function App() {

  /* ---------------- STATES ---------------- */

  const [selectedSignal, setSelectedSignal] = useState(null);

  const [rotation, setRotation] = useState(0);

  const [time, setTime] = useState("");

  const [scanText, setScanText] =
    useState("SCANNING DEEP SPACE...");

  const [alert, setAlert] = useState(
    "NO CRITICAL THREATS DETECTED"
  );

  const key1 = process.env.REACT_APP_SECRET_KEY_1;

  const key2 = process.env.REACT_APP_SECRET_KEY_2;

  const key3 = process.env.REACT_APP_SECRET_KEY_3;

  /* ---------------- DYNAMIC SIGNALS ---------------- */

  const [signals, setSignals] = useState([
    {
      id: 1,
      planet: "MARS OUTPOST",
      frequency: "145.77 GHz",
      danger: "LOW",
      x: 180,
      y: 120,
      message:
        "Unknown life signatures detected beneath surface ice.",
    },

    {
      id: 2,
      planet: "SATURN RELAY",
      frequency: "220.11 GHz",
      danger: "MEDIUM",
      x: 390,
      y: 380,
      message:
        "Encrypted distress signal repeating every 7 minutes.",
    },

    {
      id: 3,
      planet: "VOID-9",
      frequency: "98.44 GHz",
      danger: "HIGH",
      x: 430,
      y: 220,
      message:
        "Deep-space transmission cannot be translated.",
    },
  ]);

  /* ---------------- RADAR ROTATION ---------------- */

  useEffect(() => {

    const radarInterval = setInterval(() => {

      setRotation((prev) => prev + 1);

    }, 30);

    return () => clearInterval(radarInterval);

  }, []);

  /* ---------------- LIVE CLOCK ---------------- */

  useEffect(() => {

    const clock = setInterval(() => {

      const now = new Date();

      setTime(now.toLocaleTimeString());

    }, 1000);

    return () => clearInterval(clock);

  }, []);

  /* ---------------- SCAN TEXT ---------------- */

  useEffect(() => {

    const texts = [
      "SCANNING DEEP SPACE...",
      "SEARCHING FOR SIGNALS...",
      "ANALYZING TRANSMISSIONS...",
      "DECRYPTING UNKNOWN DATA...",
    ];

    let index = 0;

    const interval = setInterval(() => {

      index = (index + 1) % texts.length;

      setScanText(texts[index]);

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  /* ---------------- ALERT SYSTEM ---------------- */

  useEffect(() => {

    const alerts = [
      "VOID-9 SIGNAL STRENGTH INCREASING",
      "SATURN RELAY RECONNECTED",
      "MARS OUTPOST TRANSMISSION LOST",
      "ENCRYPTION HOLDING STABLE",
    ];

    let i = 0;

    const interval = setInterval(() => {

      i = (i + 1) % alerts.length;

      setAlert(alerts[i]);

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  /* ---------------- DYNAMIC SIGNAL CHANGES ---------------- */

  useEffect(() => {

    const planets = [
      "NEPTUNE GATE",
      "ALPHA-7",
      "VOID-9",
      "MARS OUTPOST",
      "SATURN RELAY",
      "ORION BASE",
      "TITAN NODE",
    ];

    const dangers = [
      "LOW",
      "MEDIUM",
      "HIGH",
    ];

    const messages = [
      "Encrypted alien signal detected.",
      "Communication relay unstable.",
      "Unknown object moving rapidly.",
      "Deep-space transmission intercepted.",
      "Energy spike detected nearby.",
    ];

    const interval = setInterval(() => {

      setSignals((prevSignals) =>

        prevSignals.map((signal) => ({

          ...signal,

          planet:
            planets[
              Math.floor(
                Math.random() * planets.length
              )
            ],

          danger:
            dangers[
              Math.floor(
                Math.random() * dangers.length
              )
            ],

          frequency:
            (
              Math.random() * 300
            ).toFixed(2) + " GHz",

          x:
            Math.floor(
              Math.random() * 450
            ) + 40,

          y:
            Math.floor(
              Math.random() * 450
            ) + 40,

          message:
            messages[
              Math.floor(
                Math.random() * messages.length
              )
            ],

        }))
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="app">

      {/* STARS */}

      <div className="stars"></div>

      {/* HEADER */}

      <div className="header">

        <h1>NEBULA-X</h1>

        <p>SPACE SIGNAL INTERCEPTOR</p>

      </div>

      {/* TOP INFO */}

      <div className="top-info">

        <div className="clock">
          {time}
        </div>

        <div className="scan-status">
          {scanText}
        </div>

      </div>

      {/* ALERT BOX */}

      <div className="alert-box">
        ⚠ {alert}
      </div>

      {/* RADAR */}

      <div className="radar-container">

        {/* ROTATING RADAR */}

        <div
          className="radar"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        ></div>

        {/* RADAR CIRCLES */}

        <div className="radar-circle circle1"></div>

        <div className="radar-circle circle2"></div>

        <div className="radar-circle circle3"></div>

        {/* CROSS LINES */}

        <div className="horizontal-line"></div>

        <div className="vertical-line"></div>

        {/* SIGNALS */}

        {signals.map((signal) => (

          <div
            key={signal.id}

            className={`signal ${signal.danger.toLowerCase()}`}

            onClick={() => setSelectedSignal(signal)}

            style={{
              left: `${signal.x}px`,
              top: `${signal.y}px`,
            }}
          >

            <div className="pulse"></div>

            <span className="signal-name">
              {signal.planet}
            </span>

          </div>

        ))}

      </div>

      {/* RIGHT PANEL */}

      <div className="signal-panel">

        <h2>ACTIVE SIGNALS</h2>

        {signals.map((signal) => (

          <div
            key={signal.id}
            className="signal-card"
            onClick={() => setSelectedSignal(signal)}
          >

            <span>{signal.planet}</span>

            <p>{signal.frequency}</p>

            <div className="danger">
              DANGER : {signal.danger}
            </div>

          </div>

        ))}

      </div>

      {/* STATS BOX */}

      <div className="stats-box">

        <div>
          TOTAL SIGNALS : {signals.length}
        </div>

        <div>
          HIGH RISK :
          {
            signals.filter(
              s => s.danger === "HIGH"
            ).length
          }
        </div>

      </div>

      {/* BOTTOM BAR */}

      <div className="bottom-bar">

        <div>ENGINE STATUS : ACTIVE</div>

        <div>ENCRYPTION : ENABLED</div>

        <div>POWER LEVEL : 94%</div>

      </div>

      {/* POPUP */}

      {selectedSignal && (

        <div className="popup-overlay">

          <div className="popup">

            {/* CLOSE */}

            <button
              className="close-btn"
              onClick={() => setSelectedSignal(null)}
            >
              ✕
            </button>

            {/* TITLE */}

            <h2>TRANSMISSION INTERCEPTED</h2>

            <h3>{selectedSignal.planet}</h3>

            {/* FREQUENCY */}

            <div className="frequency">
              {selectedSignal.frequency}
            </div>

            {/* MESSAGE */}

            <div className="message">
              {selectedSignal.message}
            </div>

            {/* LOADING */}

            <div className="loading-box">

              <div className="loading-bar"></div>

            </div>

            {/* SCAN LINE */}

            <div className="scan-line"></div>

            {/* STATUS */}

            <p className="status">
              SIGNAL STATUS : UNSTABLE
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;