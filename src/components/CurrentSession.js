import React, { useContext} from 'react';
import { TuneContext } from './TuneContext';



function CurrentSession() {
    const { remainingTunes } = useContext(TuneContext);
    return (
    <main>
        <div id="currentSessionContainer">
            <div id="remainingTunesDiv">
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