import React from 'react';
import * as ReactDOM from "react-dom/client";



export function App() {

    const [currentPhase, setCurrentPhase] = React.useState(null);

    const playerRef = React.useRef("");
    // if (playerRef === null) {
    // 	window.RufflePlayer = window.RufflePlayer || {};
    // 	const ruffle = window.RufflePlayer.newest();
    // 	playerRef = ruffle.createPlayer();
    // }

    function refTest() {
	const para = document.createElement('p');
	para.innerText = "testing useEffect";
	playerRef.current.appendChild(para);
    }

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
	    url: new URL("/assets/flash/deep-chalk-4-jayisgames.swf", import.meta.url)
	}
    ];
    

  return (
      <main>

	    <h1>Deep Chalk</h1>
	    <h3>By Zack Livestone. Archived from <a href="https://jayisgames.com">Jayisgames</a> using <a href="https://ruffle.rs">Ruffle</a> for Flash emulation.</h3>
      

	<label>Select a game:
	    <br />
	    <select name="phase" id="phase" value={currentPhase}
		    onChange={e => setCurrentPhase(e.target.value)}>
		{phases.map(phase =>
		    <option value={phase.id}>{phase.name}</option> 
		)}
	        </select>
        </label>

	  <button onClick={() => {
		      if (currentPhase != "") {
			  
			  window.RufflePlayer = window.RufflePlayer || {};
			  const ruffle = window.RufflePlayer.newest();
			  player = ruffle.createPlayer();

			  // remove all children from playerRef
			  while (playerRef.firstChild) {
			      playerRef.removeChild(playerRef.firstChild);
			  }
			  
		      playerRef.current.appendChild(player);
		      player.load(
			  phases.find(p => p.id === +currentPhase).url.pathname
		      );
		      }
		  }}>
	      Play
	  </button>

	  <button onClick={() => {setCurrentPhase("")}}>Close player</button>

	  <div id="game-container">


	       <div ref={playerRef}></div>


	      <br />

			  
	      
	  </div>





    </main>
  );
}
