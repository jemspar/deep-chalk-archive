/** @jsxImportSource @emotion/react */

import React from 'react';
import * as ReactDOM from "react-dom/client";

import { css } from '@emotion/react';

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
	player.style.width = "100%";
	
			  
        playerRef.current.appendChild(player);
			  
      player.load({
          url: phases.find(
              p => p.id === +currentPhase
          ).url.pathname
      });
        
    }


    const buttonStyle = css`

          margin-right: 1.5ch;

          padding: 0.5ch 0.75ch 0.5ch 0.75ch ;

color: inherit;
//font-family: inherit;
background-color: hsl(0deg 0% 100% / 0.1);
border: none;
cursor: pointer;
border-radius: 0.5ch;



`;

    

  return (
       <main>

	    <h1>Deep Chalk</h1>
	    <h3>By Zack Livestone (and Boards of Canada). Archived from <a href="https://jayisgames.com">Jayisgames</a> using <a href="https://ruffle.rs">Ruffle</a> for Flash emulation.</h3>
      

	<label>Select a game:
	    <br />
	    <select 
        css={css`
        margin-top: .75ch;
        margin-bottom: 2ch;`}
    name="phase" id="phase" value={currentPhase}
		    onChange={e => setCurrentPhase(e.target.value)}>
		
                    <option value=""></option>
		{phases.map(phase =>
		    <option value={phase.id}>{phase.name}</option> 
		)}
	        </select>
        </label>




    <div 
        id="playerButtons"
        css={css`
        margin-bottom: 3ch;
        `}
    >
        
        {currentPhase !== "" &&
         <button css={buttonStyle} onClick={attachPlayer}>
              Play
          </button>
        }

        {isPlayerOpen &&
         <>
	     <button css={buttonStyle}>Fullscreen</button>
	     <button css={buttonStyle} onClick={() => {
              setCurrentPhase("");
              detachPlayer();
		     }}>Close player</button>
	 </>
        }
          
    </div>






	  <div id="game-container">
              <div ref={playerRef}
		   css={css`
                       width:100%;
                   `}
	      ></div>  
	  </div>





    </main>
  );
}
