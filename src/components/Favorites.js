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
        <main>
            <ul id="favList">
                {favoritesList.map((set, index) => (
                <li key={index}>
                    <button className="remove" onClick={() => removeFavorite(favoritesList, setFavoritesList, set)}>Remove</button>
                    {set}
                </li>
                
                ))}
            </ul>
        </main>
    </section>
    )
}

export default Favorites;