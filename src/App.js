import React, { useReducer } from 'react';
import './App.css';

import RadioSet from './components/RadioSet';

import songData from './data/tracks.json';

import tracksReducer from './reducers';

songData.forEach((song, i) => {
  song.id = i;
  song.favorite = false;
});

const playlists = {
  morningTracks: songData.slice(0, songData.length / 2),
  eveningTracks: songData.slice(songData.length / 2, songData.length)
};

const App = () => {
  const [state, dispatch] = useReducer(tracksReducer, playlists);
  
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
