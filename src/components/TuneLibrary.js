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

function TuneLibrary() {
    const { tuneLibrary, remainingTunes, setRemainingTunes, setTuneLibrary } = useContext(TuneContext);
    const [newTune, setNewTune] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTune(newTune, setNewTune, tuneLibrary, setTuneLibrary, setRemainingTunes, remainingTunes);
        }
    }
    return (
        <div className="page-container">
    <main>
        <div>
            <h2>Tune Library</h2>
            <ol>
                {tuneLibrary.map((tune, index) => 
                    <li id="tuneList" key={index}>
                        <button class="remove" onClick={() => removeTune(tuneLibrary, setTuneLibrary, remainingTunes, setRemainingTunes, tune)}>x</button>
                        { tune }
                    </li>)}
            </ol>
        </div>
        <div>
            <input placeholder="Add new tune" value={newTune} onChange={(e) => setNewTune(e.target.value)} onKeyDown={handleKeyDown}/>
            <button onClick={() => addTune(newTune, setNewTune, tuneLibrary, setTuneLibrary, setRemainingTunes, remainingTunes)}>Add</button>
        </div>
    </main>
    </div>

    )
}

export default TuneLibrary;