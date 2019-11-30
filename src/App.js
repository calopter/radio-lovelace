import React, { useReducer } from 'react';
import './App.css';

import RadioSet from './components/RadioSet';

import songData from './data/tracks.json';

songData.forEach((song, i) => {
  song.id = i;
  song.favorite = false;
});

const fave = (tracks, action) => {
  const newTracks = tracks[action.side].map(track => {
    if (track.id === action.id) {
      return { ...track, favorite: !track.favorite };
    }
    else {
      return track;
    }
  });

  if (action.side === 'morningTracks') {
    return {
      morningTracks: newTracks,
      eveningTracks: tracks.eveningTracks
    };
  }
  else {
    return {
      morningTracks: tracks.morningTracks,
      eveningTracks: newTracks
    };
  }
};

const top = (tracks, action) => {
  const i = tracks[action.side].findIndex(track => track.id === action.id);
  let newTracks = [];
  
  if (i === -1) {
    return tracks;
  }
  else {
    newTracks = [...tracks[action.side]];
    const track = newTracks[i];

    newTracks.splice(i, 1);
    newTracks.unshift(track);
  }

  if (action.side === 'morningTracks') {
    return {
      morningTracks: newTracks,
      eveningTracks: tracks.eveningTracks
    };
  }
  else {
    return {
      morningTracks: tracks.morningTracks,
      eveningTracks: newTracks
    };
  }
};

const switchTrack = (tracks, action) => {
  const i = tracks[action.side].findIndex(track => track.id === action.id);

  let newFrom = [...tracks[action.side]];
  let newTo = [];
  
  newFrom.splice(i, 1);
  
  if (action.side === 'morningTracks') {
    newTo = [...tracks.eveningTracks];
    newTo.splice(i, 0, tracks.morningTracks[i]);
    
    return {
      morningTracks: newFrom,
      eveningTracks: newTo
    };
  }
  else {
    newTo = [...tracks.morningTracks];
    newTo.splice(i, 0, tracks.eveningTracks[i]);
    
    return {
      morningTracks: newTo,
      eveningTracks: newFrom
    };
  }
}

const tracksReducer = (tracks, action) => {
  switch(action.type) {
    case 'FAVE':
      return fave(tracks, action);
    case 'TOP':
      return top(tracks, action);
    case 'SWITCH':
      return switchTrack(tracks, action);
    default:
      return playlists;
  }
};

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
