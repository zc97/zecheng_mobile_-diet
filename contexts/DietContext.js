import React, { createContext, useState } from 'react';

const DietContext = createContext();

const DietProvider = ({ children }) => {
  const [diet, setDiet] = useState([]);

  return (
    <DietContext.Provider value={{ diet, setDiet }}>
      {children}
    </DietContext.Provider>
  );
};

export { DietContext, DietProvider };