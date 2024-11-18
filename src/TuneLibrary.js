import React from 'react';


function TuneLibrary() {
    return (
    <main>
        <div>
            <h2>Tune Library</h2>
            <ol id="tuneLibrary"></ol>
        </div>
        <div>
            <input id="newTune" placeholder="Add new tune"/>
            <button id="submitNewTune">Add</button>
        </div>
    </main>
    )
}

export default TuneLibrary;