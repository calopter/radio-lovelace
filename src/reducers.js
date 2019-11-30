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
      return tracks;
  }
};

export default tracksReducer;
