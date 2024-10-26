import React, { createContext, useState } from 'react';

// Create the activities context that stores the activities data
const ActivitiesContext = createContext();

const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export { ActivitiesContext, ActivitiesProvider };