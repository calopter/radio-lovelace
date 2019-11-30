import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { RadioDispatch } from '../App.js';

import "./styles/Track.css";

// Here we use destructuring to extract the props into separate variables
// See https://wesbos.com/destructuring-objects/
const Track = (props) => {
  const dispatch = useContext(RadioDispatch);
  const side = props.side.toLowerCase() + 'Tracks';
  
  return (
    <li className="track">
      <img className="track--albumart" alt={`album art for ${props.title}`} src={props.albumart} />
      <h3 className="track--title">{props.title}</h3>
      <input
        type="checkbox"
        className="track--favorite"
        checked={props.favorite}
        onChange={() => dispatch({ type: 'FAVE', id: props.id, side: side })}
      />
      <p className="track--artist">{props.artist}</p>
      <p className="track--playtime">{props.playtime}</p>
      <button
        className="track--control track--to-top"
        onClick={() => dispatch({ type: 'TOP', id: props.id, side: side })}
        >
        <span role="img" aria-label="send to top">🔝</span>
      </button>
      <button
        className="track--control track--switch"
        onClick={() => dispatch({ type: 'SWITCH', id: props.id, side: side })}
        >
        <span role="img" aria-label="switch lists">↔</span>
      </button>
    </li>
  );
};

Track.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  playtime: PropTypes.string,
  albumart: PropTypes.string,
  favorite: PropTypes.bool,
}

export default Track;
