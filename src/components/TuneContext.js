import React, { createContext, useState } from 'react';

export const TuneContext = createContext();

export const TuneProvider = ({ children }) => {
    const [tuneLibrary, setTuneLibrary] = useState(['Hunters House', 'Fred Finns', 'George Whites', 'Pigtown Fling', 'Tom Wards Downfall', 'Beare Island', 'Doctor Gilberts', 'Father Kellys', 'Mountain Road', 'Maud Miller', 'Yellow Tinker', 'Dowds no 9']);
    const [remainingTunes, setRemainingTunes] = useState([...tuneLibrary]);
    const [setsPlayed, setSetsPlayed] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);

    return (
        <TuneContext.Provider
          value={{
            tuneLibrary,
            setTuneLibrary,
            remainingTunes,
            setRemainingTunes,
            setsPlayed,
            setSetsPlayed,
            favoritesList,
            setFavoritesList
          }}
        >
        {children}
        </TuneContext.Provider>
      );
};

