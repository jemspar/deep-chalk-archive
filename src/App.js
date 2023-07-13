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

	player.style.maxWidth = "100%";

	
			  
        playerRef.current.appendChild(player);
			  
      player.load({
          url: phases.find(
              p => p.id === +currentPhase
          ).url.pathname
      });

	player.addEventListener('loadedmetadata', () => {
	    console.info("ruffle: loaded metadata.");
	    console.info(player.metadata.isActionScript3);
	    player.style.width = player.metadata.width + "px";
	    player.style.height = player.metadata.height + "px";
	});
        
    }

    function playerFullscreen() {
	const player = playerRef.current.firstChild;
	player.enterFullscreen();
    }
	


    const buttonStyle = css`

          margin-right: 1.5ch;

          padding: 0.5ch 0.75ch 0.5ch 0.75ch ;

color: inherit;
background-color: hsl(0deg 0% 100% / 0.1);
border: none;
cursor: pointer;
border-radius: 0.5ch;



`;

    

    return (
	<>
	    <nav>
		<a className="crumb" href="https://jeremysparagon.com/">
		&larr; jeremysparagon.com</a>
		
	    </nav>

	    
      <main>


	    <h1>Deep Chalk</h1>
	   <p css={css `
		  font-size: 1.2em;
		  width: 50ch;
	  
	      `}>By Zack Livestone (and Boards of Canada). Archived from <a href="https://jayisgames.com" target="_blank">Jayisgames</a>, using <a href="https://ruffle.rs" target="_blank">Ruffle</a> for Flash emulation. &ensp;

	       <a css={css`
font-size: 0.7em;
letter-spacing: 0.05ch;
`}
		  href="https://github.com/jemspar/deep-chalk-archive/"
		  target="_blank"
	       >
		   GitHub&rarr;
		       </a>


	   </p>
      

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
	     <button css={buttonStyle} onClick={() => {
			 playerFullscreen();
		     }}>Fullscreen</button>
	     <button css={buttonStyle} onClick={() => {
              setCurrentPhase("");
              detachPlayer();
		     }}>Close player</button>
	 </>
        }
          
    </div>






	  <div id="game-container" class="hero">
              <div ref={playerRef}
		   css={css`
                       width: fit-content;
                       margin-left: auto;
                       margin-right: auto;
                       margin-top: 3ch;
                       margin-bottom: 6ch;
                   `}
	      ></div>  
	  </div>





      </main>



	</>
	
  );
}
