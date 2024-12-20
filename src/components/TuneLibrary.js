import React, { useState, useContext } from 'react';
import { TuneContext } from './TuneContext';


function removeTune(tuneLibrary, setTuneLibrary, remainingTunes, setRemainingTunes, tuneToRemove) {

    const updatedTuneLibrary = tuneLibrary.filter(tune => tune !== tuneToRemove);
    setTuneLibrary(updatedTuneLibrary)

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



// fetch('https://thesession.org/tunes/popular/reels?format=json&perpage=50&page=1')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Unable to connect to the session');
//     }
//     return response.json();
//   })
//   .then(data => {
//     const tunes = data.tunes.map(tune => tune.name);
//     console.log(tunes)

//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

function TuneLibrary() {
    const { tuneLibrary, remainingTunes, setRemainingTunes, setTuneLibrary } = useContext(TuneContext);
    const [newTune, setNewTune] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTune(newTune, setNewTune, tuneLibrary, setTuneLibrary, setRemainingTunes, remainingTunes);
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
                <h4>from <i><u>TheSession.org</u></i>.</h4>
            <input placeholder="XYZ"/>
            <button onClick={() => console.log("to the session!")}>Go!</button>
        </div>
        
        </div>
    </main>

    )
}

export default TuneLibrary;