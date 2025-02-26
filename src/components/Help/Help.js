import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./Help.css";

function Help() {
  return (
    <div className="help-button-container">
      <button className="help-button"
        data-tooltip-id="help-tooltip"
      >
        ❔
    </button>

      <Tooltip id="help-tooltip" place="top" effect="solid">
        <strong>Tune Tumbler</strong> is a web app for generating random sets of Irish Reels.<br /><br />

        <div className="gradient-arrow"/> Start by clicking the <strong style={{color: "#34c453"}}>Generate Set</strong> button to create a set of Irish Reels. <br/>
        <div className="gradient-arrow"/> Keep generating sets until you run out of tunes. <br/>
        <div className="gradient-arrow"/> Once out of tunes, click the <strong style={{color: "#34c453"}}>Reset</strong> button to start the session over.<br />
        <div className="gradient-arrow"/> Visit the <strong style={{color: "#34c453"}}>Tune Library</strong> page to customize the collection of tunes that your sets are generated from.<br />
        <div className="gradient-arrow"/> On the <strong style={{color: "#34c453"}}>Remaining Tunes</strong> page, you'll find all of the tunes that have yet to be included in a set.<br />
        <div className="gradient-arrow"/> See the <strong style={{color: "#34c453"}}>Session Spinner</strong> to explore a map of Irish sessions around the world (Data from thesession.org link below) <br />
        <div className="gradient-arrow"/> Fly to a random session by clicking the <button style={{backgroundColor:"#64f4b3", padding: "3px", borderRadius: "5px" }}> 🎲 🌍 </button> button. <br />
        <div className="gradient-arrow"/> Link to session data: <i><u>https://github.com/adactio/TheSession-data/blob/main/json/sessions.json</u></i>
      </Tooltip>
    </div>
  );
}

export default Help;
