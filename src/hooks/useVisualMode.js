import { useState } from "react";

export default function useVisualMode( initial ) {
  const [ mode, setMode ] = useState( initial ),
    [ history, setHistory ] = useState([ initial ]);

  const transition = ( mode, replace = false ) => {
    if ( replace ) {
      const splice = history => {
        history.splice( -1, 1, mode );
        return [ ...history ];
      };

      setHistory( splice([ ...history ]) );
      return setMode( mode );
    };

    setHistory([ ...history, mode ]);
    return setMode( mode );
  };

  const back = () => {
    const pop = history => {
      if ( history.length === 1 ) return [ ...history ];
      
      history.pop( );
      return [ ...history ];
    };

    const newHistory = pop([ ...history ]);

    setHistory( newHistory );
    return setMode( newHistory[ newHistory.length - 1 ] );
  };
  
  return { mode, transition, back };
};
