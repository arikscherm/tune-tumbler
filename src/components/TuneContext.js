import React, { createContext, useState } from 'react';

export const TuneContext = createContext();

export const TuneProvider = ({ children }) => {
    const [tuneLibrary, setTuneLibrary] = useState(
      [
        'Tom Wards Downfall', 'George Whites Favorite', 'Fox on the Town', 'Green Mountain', 'Reconciliation', 'MacArthur Road', 
        'Black Pats', 'Musical Priest', 'Green Groves of Erin', 'Sally Gardens', 'Maud Miller', 'The Mountain Road',
        'Flooded Road to Glenties', 'Martin Wynnes #2', 'Star of Munster', 'Sweeneys Dream', 'Congress', 'Palmers Gate',
        'Black Pats', 'Farrel O Gara', 'Concertina Reel', 'Beare Island', 'Monoghan Twig', 'Earls Chair',
        'Julia Delaneys', 'Martin OConnors', 'Foxhunters', 'Father Kellys', 'Farewell to Erin', 'Castle Kellys',
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

