import React from 'react';
import * as ReactDOM from "react-dom/client";



export function App() {

    const phases = [
        {id: 1, name: "First Phase"},
        {id: 2, name: "Second Phase"},
        {id: 3, name: "Third Phase"},
        {id: 4, name: "Deep Chalk.4"}
    ];

    function renderRuffle(flashFilename) {
	window.RufflePlayer = window.RufflePlayer || {};
	    const ruffle = window.RufflePlayer.newest();
	    const player = ruffle.createPlayer();
	    // const container = document.getElementById("game-container");
	    
	   return player;
    };
    

  return (
      <main>

	    <h1>Deep Chalk</h1>
	    <h3>By Zack Livestone. Archived from <a href="https://jayisgames.com">Jayisgames</a> using <a href="https://ruffle.rs">Ruffle</a> for Flash emulation.</h3>
      

	<label>Select a Deep Chalk Phase:
	    <br />
	    <select name="phase" id="phase">
		{phases.map(phase =>
		    <option name={phase.id}>{phase.name}</option> 
		)}
	        </select>
        </label>

	  <div id="game-container">


	      <embed src={new URL("/assets/flash/deep-chalk.swf", import.meta.url)}></embed>
	      
	  </div>





    </main>
  );
}
