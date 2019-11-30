import React, { useReducer } from 'react';
import './App.css';

import RadioSet from './components/RadioSet';

import songData from './data/tracks.json';

songData.forEach((song, i) => {
  song.id = i;
  song.favorite = false;
});

const fave = (tracks, action) => {
  return tracks.map(track => {
    if (track.id === action.id) {
      return { ...track, favorite: !track.favorite };
    }
    else {
      return track;
    }
  });
};

const top = (tracks, action) => {
  const i = tracks.findIndex(track => track.id === action.id);
  
  if (i === -1) {
    return tracks;
  }
  else {
    let newTracks = [...tracks];
    const track = newTracks[i];

    newTracks.splice(i, 1);
    newTracks.unshift(track);

    return newTracks;
  }
};

const transact = ({ morningTracks, eveningTracks }, action) => {
  switch(action.type) {
    case 'FAVE':
      return {
        morningTracks: fave(morningTracks, action),
        eveningTracks: fave(eveningTracks, action)
      };
    case 'TOP': {
      return {
        morningTracks: top(morningTracks, action),
        eveningTracks: top(eveningTracks, action)
      };
    }
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
