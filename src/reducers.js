const favorite = (tracks, action) => {
  return tracks.map(track => {
    if (track.id === action.id) {
      return { ...track, favorite: !track.favorite };
    }
    else {
      return track;
    }
  });
};

const fave = (tracks, action) => {
    return {
      ...tracks, 
      [action.side]: favorite(tracks[action.side], action)
    };
};

const sendTop = (tracks, action) => {
  const i = tracks.findIndex(track => track.id === action.id);
  
  let newTracks = [...tracks];
  const track = newTracks[i];

  newTracks.splice(i, 1);
  newTracks.unshift(track);

  return newTracks;
};

const top = (tracks, action) => {
  return {
    ...tracks,
    [action.side]: sendTop(tracks[action.side], action)
  };
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
