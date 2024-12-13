import React, { useContext} from 'react';
import { TuneContext } from './TuneContext';



function CurrentSession() {
    const { remainingTunes, setsPlayed } = useContext(TuneContext);
    return (
    <main>
        <div id="currentSessionContainer">
            <div id="remainingTunesDiv">
                <h2>Remaining Tunes</h2>
                <ol>
                    {remainingTunes.map((tune, index) => (
                        <li key={index}>{tune}</li>
                    ))}
                </ol>
            </div>
        </div> 
    </main>
    )
}

export default CurrentSession;