import React, { createContext, useState } from 'react';

const ActivitiesContext = createContext();

const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    { id: '1', activity: 'Running', date: '2023-10-01', time: '30 mins' },
    { id: '2', activity: 'Swimming', date: '2023-10-02', time: '45 mins' },
    { id: '3', activity: 'Cycling', date: '2023-10-03', time: '60 mins' }
  ]);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export { ActivitiesContext, ActivitiesProvider };