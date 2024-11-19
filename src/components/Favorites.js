import React, { useContext } from 'react';
import { TuneContext } from './TuneContext';


function removeFavorite(favoritesList, setFavoritesList, setToRemove) {
    const updatedFavoritesList = favoritesList.filter(set => set !== setToRemove);
    setFavoritesList(updatedFavoritesList);
}


function Favorites() {
    const { favoritesList, setFavoritesList } = useContext(TuneContext);
    return (
    <section>
        <h2>Favorites</h2>
        <ol>
            {favoritesList.map((set, index) => (
            <li key={index}>
                {set}
                <button onClick={() => removeFavorite(favoritesList, setFavoritesList, set)}>Remove</button>
            </li>
            
            ))}
        </ol>
    </section>
    )
}

export default Favorites;