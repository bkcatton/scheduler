import React, {useState} from "react";

export function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      back();
      setMode(mode)
    } 
    setMode(mode);
    setHistory([...history, mode]);
  }

  function back() {
    history.splice(-1, 1);
    setHistory(history); 
    setMode(history[history.length-1]);
  }
  
  return { mode, transition , back};
};

