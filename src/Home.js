import React, { useState } from 'react';


function GetRandomSet(setNewSet, remainingTunes) {
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

    }

}

// Clear the current session
function ResetSession(tuneLibrary, setRemainingTunes, setNewSet) {

    setNewSet('');
    setRemainingTunes([...tuneLibrary]);

}


function Home() {
    const [tuneLibrary] = useState(['A', 'B', 'C', 'D', 'E', 'F']);
    const [remainingTunes, setRemainingTunes] = useState([...tuneLibrary]);
    const [newSet, setNewSet] = useState('');
    return (
    <main>
        <section id="homeButtonsContainer">
            <button onClick={() => ResetSession(tuneLibrary, setRemainingTunes, setNewSet)}>Reset</button>
            <button onClick={() => GetRandomSet(setNewSet, remainingTunes)}>Generate Set!</button>
        </section>
        <div>
        <p>{newSet}</p>
        </div>
    </main>

    )
}

export default Home;