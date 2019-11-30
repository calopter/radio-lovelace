import React, { useReducer } from 'react';
import './App.css';

import RadioSet from './components/RadioSet';

import songData from './data/tracks.json';

songData.forEach((song, i) => {
  song.id = i;
  song.favorite = false;
});

const transact = ({ morningTracks, eveningTracks }, action) => {
  const fave = (track) => {
    console.log(action);
    if (track.id === action.id) {
      return { ...track, favorite: !track.favorite };
    }
    else {
      return track;
    }
  };

  switch(action.type) {
    case 'FAVE':
      return {
        morningTracks: morningTracks.map(fave, action),
        eveningTracks: eveningTracks.map(fave, action)
      };
    default:
      return playlists;
  }
};

const playlists = {
  morningTracks: songData.slice(0, songData.length / 2),
  eveningTracks: songData.slice(songData.length / 2, songData.length)
};

const App = () => {
  const [state, dispatch] = useReducer(transact, playlists);
  
  return (
    <div className="App">
      <header>
        <h1 className="page-header--title">Radio Lovelace</h1>
      </header>
      <main className="main">
        <RadioSet playlists={state} dispatch={dispatch} />
      </main>
    </div>
  );
};

export default App;
