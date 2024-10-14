import React, { createContext, useState } from 'react';

// Create the diet context that stores the diets data
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