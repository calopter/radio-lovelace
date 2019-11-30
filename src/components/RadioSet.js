import React from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

const RadioSet = ({ playlists, dispatch }) => {
  return (
    <div className="radio-set">
      <section className="radio-set--playlist-container">
        <Playlist
          side="Morning"
          tracks={playlists.morningTracks}
          dispatch={dispatch}
        />
        <Playlist
          side="Evening"
          tracks={playlists.eveningTracks}
          dispatch={dispatch}
        />
      </section>
    </div>
  );
};

export default RadioSet;
