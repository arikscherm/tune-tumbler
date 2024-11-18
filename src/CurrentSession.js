import React from 'react';


function CurrentSession() {
    return (
    <main>
        <div id="currentSessionContainer">
            <div id="setsPlayedDiv">
                <h2>Sets Played</h2>
                <ol id="setsPlayed"></ol>
            </div>
            <div id="remainingTunesDiv">
                <h2>Remaining Tunes</h2>
                <ol id="remainingTunes"></ol>
            </div>
        </div> 
    </main>
    )
}

export default CurrentSession;