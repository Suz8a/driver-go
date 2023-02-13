import React, { ReactNode, useState } from "react";

export const AsyncStorageContext = React.createContext({});

export const AsyncStorageProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({});
  return (
    <AsyncStorageContext.Provider value={[state, setState]}>
      {children}
    </AsyncStorageContext.Provider>
  );
};
