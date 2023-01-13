import { useState } from "react";

export default function useVisualMode( initial ) {
  const [ mode, setMode ] = useState( initial );
  const [ history, setHistory ] = useState([ initial ]);

  const transition = ( mode, replace = false ) => {
    if (replace) {
      const splice = history => {
        history.splice( -1, 1, mode )
        return history
      }

      setHistory( splice( [...history] ) )
      setMode( mode )
      return
    }

    setHistory([ ...history, mode ])
    setMode( mode )
    return
  }

  const back = () => {
    const pop = history => {
      if (history.length === 1) return history
      
      history.pop()
      return history
    };

    setHistory( pop( history ) )
    setMode( history[ history.length - 1 ])
    return
  };

  return { mode, transition, back };
};
