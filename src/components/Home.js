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
            let randomIndex = Math.floor(Math.random() * remainingTunes.length);
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
        setSetsPlayed([generatedSet, ...setsPlayed]);

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

    else {
        const updatedFavoritesList = [...favoritesList, newSet];
        setFavoritesList(updatedFavoritesList);
    }
}



function Home() {
    const { tuneLibrary, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed, favoritesList, setFavoritesList } = useContext(TuneContext);
    const [newSet, setNewSet] = useState('');
    return (
        <main>
            <section id="homeButtonsContainer">
                <button class="generate-set" onClick={() => GetRandomSet(newSet, setNewSet, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed)}>Generate Set!</button>
                <div>
                    <div id="setsPlayedDiv">
                        <ol>
                            {setsPlayed.map((set, index) => (
                                <li key={index}>
                                    {set}
                                    <button id="addFavorite" onClick={() => addFavorite(favoritesList, setFavoritesList, newSet)} />
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <button id="resetButton" onClick={() => ResetSession(tuneLibrary, setRemainingTunes, setNewSet, setSetsPlayed)}>Reset</button>
            </section>
            <p>Welcome to TuneDice!</p>
            <p>Click the Generate Set button to create a random set of 3 Irish Reels.</p>
            <p>Keep on playing random sets until you run out of tunes!</p>
            <p>Once out of tunes, click the Reset button to refresh.</p>
            <p>Visit the Tune Library page to view and edit your collection of tunes.</p>
            <p>Visit the Remaining Tunes page to view tunes that haven't been randomly selected yet.</p>
        </main>

    )
}

export default Home;