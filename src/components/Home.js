import React, { useState, useContext } from 'react';
import { TuneContext } from './TuneContext';


function GetRandomSet(newSet, setNewSet, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed) {
    let generatedSet = '';
    if (remainingTunes.length < 3) {
        alert("Out of tunes! Please reset the session to get more sets.");
    }

    else {
        for (let i = 0; i < 3; i++) {
        
            //Select random tune and delete it from remainingTunes
            let randomIndex = Math.floor(Math.random()*remainingTunes.length);
            let newTune = remainingTunes[randomIndex];
            remainingTunes.splice(randomIndex, 1);
            
            //Concatenate new tune to the set. Sets are displayed as a string--> tune1/ tune2/ tune3
            if (i < 2) {
                generatedSet = generatedSet.concat(newTune.concat('/ '));
            }
            else {
                generatedSet = generatedSet.concat(newTune);
            }
            
        }
        setNewSet(generatedSet);
        setSetsPlayed([...setsPlayed, generatedSet]);

    }

}

// Clear the current session
function ResetSession(tuneLibrary, setRemainingTunes, setNewSet, setSetsPlayed) {
    setNewSet('');
    setRemainingTunes([...tuneLibrary]);
    setSetsPlayed([]);

}


function addFavorite(favoritesList, setFavoritesList, newSet) {

    if (favoritesList.includes(newSet)) {
        alert("Set Already Favorited!")
    }

    const updatedFavoritesList = [...favoritesList, newSet];
    setFavoritesList(updatedFavoritesList);
}



function Home() {
    const { tuneLibrary, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed, favoritesList, setFavoritesList } = useContext(TuneContext);
    const [newSet, setNewSet] = useState('');
    return (
    <main>
        <section id="homeButtonsContainer">
            <button onClick={() => ResetSession(tuneLibrary, setRemainingTunes, setNewSet, setSetsPlayed)}>Reset</button>
            <button onClick={() => GetRandomSet(newSet, setNewSet, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed)}>Generate Set!</button>
        </section>
        <div>
        <p>{newSet}</p>
        {newSet && (
            <button onClick={() => addFavorite(favoritesList, setFavoritesList, newSet)}>
                Add Favorite
            </button>
        )}
        </div>
    </main>

    )
}

export default Home;