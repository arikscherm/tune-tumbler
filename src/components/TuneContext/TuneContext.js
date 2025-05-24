import React, { createContext, useState } from 'react';

export const TuneContext = createContext();

export const TuneProvider = ({ children }) => {
    const [tuneLibrary, setTuneLibrary] = useState(
      [
        'Tom Wards Downfall', 'John Keith Lang', 'Fox on the Town', 'Noon Lasses', 'Reconciliation', 'MacArthur Road', 
        'Black Pats', 'Graf Spee', 'Green Groves of Erin', 'The Road to Errogie', 'Maud Miller', 'The Mountain Road',
        'Flooded Road to Glenties', 'Martin Wynnes #1', 'Martin Wynnes #2', 'Sweeneys Dream', 'Franks Reel', 'Palmers Gate',
        'Dowds No 9', 'Farrel OGara', 'Concertina Reel', 'Beare Island', 'Monoghan Twig', 'The Boys on the 25',
        'The Girl That Broke My Heart', 'Martin OConnors', 'Foxhunters', 'Jerry OSullivans', 'Mouth of the Tobique', 'Music For a Found Harmonium',
      ]);
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

