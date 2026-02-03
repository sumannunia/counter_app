import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// RADHA-KRISHNA COUNTER APPLICATION
// Premium Counter with Dual Theme System
// ==========================================

// Local Storage Keys
const STORAGE_KEYS = {
  COUNTER: "radha-krishna-counter-value",
  THEME_MODE: "radha-krishna-theme-mode", // 'light' | 'dark'
  THEME_STYLE: "radha-krishna-theme-style", // 'default' | 'radha'
};

// Background Image URLs - Easy to replace
const BACKGROUND_IMAGES = {
  desktop: "/radha-krishna-desktop.png",
  mobile: "/radha-krishna-mobile.jpeg",
};

// Inspirational Quotes
const QUOTES = {
  default: [
    { text: "Count your blessings, not your problems.", author: "— Wisdom" },
    { text: "Every number tells a story. What's yours?", author: "— Life" },
  ],
  radha: [
    {
      text: "Where there is Radha, there is Krishna... where there is love, there is the divine.",
      author: "— Bhakti Poetry",
    },
    {
      text: "In the divine play of love, every moment counts.",
      author: "— Vrindavan Wisdom",
    },
    {
      text: "Let your heart be a garden where Krishna's love blooms eternal.",
      author: "— Devotional Verse",
    },
  ],
};

// ==========================================
// FLOATING PARTICLES COMPONENT
// ==========================================
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 15,
    duration: 15 + Math.random() * 10,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 0.6, 0.6, 0],
            rotate: 720,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// BACKGROUND COMPONENT
// ==========================================
const RadhaKrishnaBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      className="rk-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src={isMobile ? BACKGROUND_IMAGES.mobile : BACKGROUND_IMAGES.desktop}
        alt="Radha Krishna Divine Art"
        className="rk-background-image"
      />
      <div className="rk-background-overlay" />
    </motion.div>
  );
};

// ==========================================
// THEME TOGGLE BUTTONS
// ==========================================
const ThemeControls = ({
  themeMode,
  themeStyle,
  onToggleMode,
  onToggleStyle,
}) => {
  return (
    <motion.div
      className="theme-controls"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Dark/Light Mode Toggle */}
      <motion.button
        className="theme-toggle-btn"
        onClick={onToggleMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={
          themeMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
        }
        aria-label={
          themeMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
        }
      >
        {themeMode === "light" ? "🌙" : "☀️"}
      </motion.button>

      {/* Theme Style Toggle */}
      <motion.button
        className="theme-toggle-btn"
        onClick={onToggleStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={
          themeStyle === "default"
            ? "Switch to Radha-Krishna Theme"
            : "Switch to Default Theme"
        }
        aria-label={
          themeStyle === "default"
            ? "Switch to Radha-Krishna Theme"
            : "Switch to Default Theme"
        }
      >
        {themeStyle === "default" ? "🙏" : "✨"}
      </motion.button>
    </motion.div>
  );
};

// ==========================================
// COUNTER DISPLAY COMPONENT
// ==========================================
const CounterDisplay = ({ count, isRadhaTheme }) => {
  return (
    <div className="counter-display">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          className="counter-value"
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.2, opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {count}
        </motion.div>
      </AnimatePresence>
      <motion.p
        className="counter-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isRadhaTheme ? "Sacred Count" : "Current Count"}
      </motion.p>
    </div>
  );
};

// ==========================================
// COUNTER BUTTONS COMPONENT
// ==========================================
const CounterButtons = ({ onIncrement, onReset, isRadhaTheme }) => {
  return (
    <>
      {/* Large Circular Increment Button - Perfect for Japa counting */}
      <motion.button
        className="counter-btn primary japa-btn"
        onClick={onIncrement}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Increment count"
      >
        <span className="japa-btn-inner">{isRadhaTheme ? "ॐ" : "+"}</span>
        <span className="japa-btn-label">
          {isRadhaTheme ? "Tap to Count" : "Tap"}
        </span>
      </motion.button>
    </>
  );
};

// ==========================================
// QUOTE DISPLAY COMPONENT
// ==========================================
const QuoteDisplay = ({ themeStyle }) => {
  const quotes = themeStyle === "radha" ? QUOTES.radha : QUOTES.default;
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, [themeStyle]);

  return (
    <motion.div
      className="quote-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <p className="quote-text">"{currentQuote.text}"</p>
      <p className="quote-author">{currentQuote.author}</p>
    </motion.div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  // State Management
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COUNTER);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME_MODE);
    if (saved) return saved;
    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const [themeStyle, setThemeStyle] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME_STYLE);
    return saved || "default";
  });

  // Persist counter value
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUNTER, count.toString());
  }, [count]);

  // Persist theme mode
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, themeMode);
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  // Persist theme style
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME_STYLE, themeStyle);
  }, [themeStyle]);

  // Counter Actions
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  // Theme Actions
  const toggleThemeMode = useCallback(() => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleThemeStyle = useCallback(() => {
    setThemeStyle((prev) => (prev === "default" ? "radha" : "default"));
  }, []);

  const isRadhaTheme = themeStyle === "radha";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={themeStyle}
        className={`app-container ${isRadhaTheme ? "radha-theme" : "default-theme"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Theme Controls */}
        <ThemeControls
          themeMode={themeMode}
          themeStyle={themeStyle}
          onToggleMode={toggleThemeMode}
          onToggleStyle={toggleThemeStyle}
        />

        {/* Radha Krishna Background */}
        <AnimatePresence>
          {isRadhaTheme && (
            <>
              <RadhaKrishnaBackground />
              <FloatingParticles />
            </>
          )}
        </AnimatePresence>

        {/* Default Theme Decorations */}
        {!isRadhaTheme && (
          <>
            <div className="bg-decoration bg-decoration-1" />
            <div className="bg-decoration bg-decoration-2" />
          </>
        )}

        {/* Main Content */}
        <div className="content-wrapper">
          {/* Counter Card */}
          <motion.div
            className="counter-card"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.1,
            }}
          >
            {/* Om Symbol for Radha Theme */}
            {isRadhaTheme && (
              <motion.div
                className="om-symbol"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                ॐ
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              className="counter-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isRadhaTheme ? "Divine Counter" : "Counter"}
            </motion.h1>

            {/* Divider */}
            <div className="divider" />

            {/* Counter Display */}
            <CounterDisplay count={count} isRadhaTheme={isRadhaTheme} />

            {/* Counter Buttons */}
            <CounterButtons
              onIncrement={handleIncrement}
              onReset={handleReset}
              isRadhaTheme={isRadhaTheme}
            />
          </motion.div>

          {/* Theme Switcher */}
          <motion.div
            className="theme-switcher"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              className={`theme-option ${themeStyle === "default" ? "active" : ""}`}
              onClick={() => setThemeStyle("default")}
            >
              ✨ Modern
            </button>
            <button
              className={`theme-option ${themeStyle === "radha" ? "active" : ""}`}
              onClick={() => setThemeStyle("radha")}
            >
              🙏 Radha-Krishna
            </button>
          </motion.div>

          {/* Quote Section */}
          <QuoteDisplay themeStyle={themeStyle} />
          <motion.button
            className="counter-btn secondary reset-btn"
            onClick={handleReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Reset count to zero"
          >
            🔄 Reset
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
