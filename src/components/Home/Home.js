import React, { useState, useContext } from 'react';
import { TuneContext } from '../TuneContext/TuneContext';
import './Home.css'

function GetRandomSet(newSet, setNewSet, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed) {
    let generatedSet = '';
    if (remainingTunes.length < 3) {
        alert("Out of tunes! Please reset the session to get more sets.");
    }

    else {
        for (let i = 0; i < 3; i++) {

            // Select random tune and delete it from remainingTunes
            let randomIndex = Math.floor(Math.random() * remainingTunes.length);
            let newTune = remainingTunes[randomIndex];
            remainingTunes.splice(randomIndex, 1);

            // Concatenate new tune to the set. Sets are displayed as a string--> tune1/ tune2/ tune3
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



function Home() {
    const { tuneLibrary, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed } = useContext(TuneContext);
    const [newSet, setNewSet] = useState('');
    return (
        <main>
            <section id="homeButtonsContainer">
                <h4 id="generateInstructions">
                    <i>Too many tunes? Let Tune Tumbler choose for you!</i> <br></br>
                    <i>Click the button below to generate a set of 3 Irish reels!</i></h4>
                <button className="generate-set" onClick={() => GetRandomSet(newSet, setNewSet, remainingTunes, setRemainingTunes, setsPlayed, setSetsPlayed)}>Generate Set!</button>
                <div>
                    <div id="setsPlayedDiv">
                        <ol>
                            {setsPlayed.map((set, index) => (
                                <li id="individualSet" key={index}>
                                    {set}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <button id="resetButton" onClick={() => ResetSession(tuneLibrary, setRemainingTunes, setNewSet, setSetsPlayed)}>Reset</button>
            </section>
        </main>

    )
}

export default Home;