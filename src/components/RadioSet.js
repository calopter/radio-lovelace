import React from 'react';
import "./styles/RadioSet.css";

import Playlist from './Playlist';

const RadioSet = ({ playlists: { morningTracks, eveningTracks }}) => {
  return (
    <div className="radio-set">
      <section className="radio-set--playlist-container">
        <Playlist
          side="Morning"
          tracks={morningTracks}
        />
        <Playlist
          side="Evening"
          tracks={eveningTracks}
        />
      </section>
    </div>
  );
};

export default RadioSet;
