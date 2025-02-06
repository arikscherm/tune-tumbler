import React, { useState, useContext } from 'react';
import { TuneContext } from './TuneContext';


function removeTune(tuneLibrary, setTuneLibrary, remainingTunes, setRemainingTunes, tuneToRemove) {

    const updatedTuneLibrary = tuneLibrary.filter(tune => tune !== tuneToRemove);
    setTuneLibrary(updatedTuneLibrary);

    if (remainingTunes.includes(tuneToRemove)) {
        const updatedRemainingTunes = remainingTunes.filter(tune => tune !== tuneToRemove);
        setRemainingTunes(updatedRemainingTunes);
    }

}

function addTune(newTune, setNewTune, tuneLibrary, setTuneLibrary, setRemainingTunes, remainingTunes) {

    if (!newTune) return;

    if (tuneLibrary.includes(newTune)) {
        alert("Tune already in library!");
    }
    else {
        const updatedTuneLibrary = [...tuneLibrary, newTune];
        setTuneLibrary(updatedTuneLibrary);
        const updatedRemainingTunes = [...remainingTunes, newTune];
        setRemainingTunes(updatedRemainingTunes);
        setNewTune('');
    }

}


async function fetchFromSession(numTunes, setNumTunes, tuneLibrary, setTuneLibrary, remainingTunes, setRemainingTunes) {
    const pages = Math.ceil(numTunes / 50);
    let newTuneLibrary = [];
    console.log(pages)
    for (let i = 1; i < pages+1; i++) {
        console.log("Before Fetch");
        try {
            const response = await fetch(`https://thesession.org/tunes/popular/reels?format=json&perpage=50&page=${i}`);
            if (!response.ok) {
                throw new Error('Unable to connect to the session');
            }
            const data = await response.json();
            const fetchedTunes = data.tunes.map(tune => tune.name);
            console.log(fetchedTunes);

            // If it's the first page, reset the tune library
            if (i === 1) {
                setTuneLibrary([]);
                console.log("Tune Library Reset");
            }

            // If it's the last page, handle remaining tunes
            if (i === pages) {
                console.log("Last page");
                const remainingNumTunes = numTunes % 50;
                if (remainingNumTunes !== 0) {
                    newTuneLibrary = [...newTuneLibrary, ...fetchedTunes.slice(0, remainingNumTunes)];
                }
                else {
                    newTuneLibrary = [...newTuneLibrary, ...fetchedTunes];
                }
                
            }
            else { 
                newTuneLibrary = [...newTuneLibrary, ...fetchedTunes];
            }



        } catch (error) {
            console.error('Processing Error:', error);
        }
    }
    setNumTunes('');
    setTuneLibrary(newTuneLibrary);
    // const updatedRemainingTunes = tuneLibrary;
    setRemainingTunes(newTuneLibrary);
    console.log(tuneLibrary);
}


function TuneLibrary() {
    const { tuneLibrary, remainingTunes, setRemainingTunes, setTuneLibrary } = useContext(TuneContext);
    const [newTune, setNewTune] = useState('');
    const [numTunes, setNumTunes] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTune(newTune, setNewTune, tuneLibrary, setTuneLibrary, setRemainingTunes, remainingTunes);
        }
    }
    const handleKeyDownFetch = (e) => {
        if (e.key === 'Enter') {
            fetchFromSession(numTunes, setNumTunes, tuneLibrary, setTuneLibrary, remainingTunes, setRemainingTunes);
        }
    }
    return (
    <main id="tuneLibContainer">
        <div>
            <ol>
                {tuneLibrary.map((tune, index) => 
                    <li id="tuneList" key={index}>
                    { tune }
                        <button className="remove" onClick={() => removeTune(tuneLibrary, setTuneLibrary, remainingTunes, setRemainingTunes, tune)}>Remove</button>
                    </li>)}
            </ol>
        </div>
        <div id="newTuneInputs">
            <input placeholder="Add new tune" value={newTune} onChange={(e) => setNewTune(e.target.value)} onKeyDown={handleKeyDown}/>
            <button onClick={() => addTune(newTune, setNewTune, tuneLibrary, setTuneLibrary, setRemainingTunes, remainingTunes)}>Add</button>
        <div id="sessionAPI">
            <h2>Or...</h2>
            <h4>Get the top XYZ most popular tunes</h4>
                <h4>from <a href="https://thesession.org/"><i><u>TheSession.org</u></i>.</a></h4>
            <input placeholder="XYZ" type="number" value={numTunes} onChange={(e) => setNumTunes(e.target.value)} onKeyDown={handleKeyDownFetch}/>
            <button onClick={() => fetchFromSession(numTunes, setNumTunes, tuneLibrary, setTuneLibrary, remainingTunes, setRemainingTunes)}>Go!</button>
        </div>
        
        </div>
    </main>

    )
}

export default TuneLibrary;