import React from 'react';
import * as ReactDOM from "react-dom/client";

export function App() {

    const [currentPhase, setCurrentPhase] = React.useState("");
    
    const [isPlayerOpen, setIsPlayerOpen] = 
          React.useState(false);
   

    // RufflePlayer.createPlayer returns an HTMLElement obj, which much be inserted into the DOM using appendChild(), therefore it cannot be known to React and useRef is req'd
    const playerRef = React.useRef("");


    const phases = [
        {
	    id: 1,
	    name: "First Phase",
	    url: new URL("/assets/flash/deep-chalk.swf", import.meta.url)
	},
        {
	    id: 2,
	    name: "Second Phase",
	    url: new URL("/assets/flash/deep-chalk-2.swf", import.meta.url)
	},
        {
	    id: 3,
	    name: "Third Phase",
	    url: new URL("/assets/flash/deep-chalk-3.swf", import.meta.url)
	},
        {
	    id: 4,
	    name: "Deep Chalk.4",
	    url: new URL("/assets/flash/deep-chalk-4-jayisgames_domainlockremoved.swf", import.meta.url),
	}
    ];
    
    
    function detachPlayer() {
        setIsPlayerOpen(false);
        // remove all children from playerRef
        while (playerRef.current.firstChild) {
            playerRef.current.removeChild(
                playerRef.current.firstChild
            );
		}
    }
    
    function attachPlayer() {
        detachPlayer();
        setIsPlayerOpen(true);
        
        window.RufflePlayer = window.RufflePlayer || {};
        window.RufflePlayer.config = {
            "contextMenu": true,
            "showSwfDownload": true,
            "menu": true,
            "quality": "high",
            allowScriptAccess: false,
	    };
			  
        const ruffle = window.RufflePlayer.newest();
        console.log(ruffle);
        player = ruffle.createPlayer();
			  
        playerRef.current.appendChild(player);
			  
      player.load({
          url: phases.find(
              p => p.id === +currentPhase
          ).url.pathname
      });
        
    }
    

  return (
       <main>

	    <h1>Deep Chalk</h1>
	    <h3>By Zack Livestone. Archived from <a href="https://jayisgames.com">Jayisgames</a> using <a href="https://ruffle.rs">Ruffle</a> for Flash emulation.</h3>
      

	<label>Select a game:
	    <br />
	    <select name="phase" id="phase" value={currentPhase}
		    onChange={e => setCurrentPhase(e.target.value)}>
		
                    <option value=""></option>
		{phases.map(phase =>
		    <option value={phase.id}>{phase.name}</option> 
		)}
	        </select>
        </label>

        {currentPhase !== "" &&
	  <button onClick={attachPlayer}>
	      Play
	  </button>
    }

          {isPlayerOpen &&
	      <button onClick={() => {
              setCurrentPhase("");
              detachPlayer();
          }}>Close player</button>
          }

	  <div id="game-container">


                   <div ref={playerRef}></div>	  
	      
	  </div>





    </main>
  );
}
