import React, { createContext, useState } from "react";

export const scoreContext = createContext();

function Context(props) {
  const [score, setScore] = useState(0);

  return (
    <scoreContext.Provider value={[score, setScore]}>
      {props.children}
    </scoreContext.Provider>
  );
}

export default Context;
