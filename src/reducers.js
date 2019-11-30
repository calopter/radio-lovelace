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

const swapLists = (tracks, { side, to, id }) => {
  const i = tracks[side].findIndex(track => track.id === id);

  const newFrom = [...tracks[side]];
  const newTo = [...tracks[to]];
  
  newFrom.splice(i, 1);
  newTo.splice(i, 0, tracks[side][i]);

  return {
    ...tracks,
    [side]: newFrom,
    [to]: newTo
  };
};

const switchTrack = (tracks, action) => {
  if (action.side === 'morningTracks') {
    action.to = 'eveningTracks';
  }
  else {
    action.to = 'morningTracks';
  }

  return swapLists(tracks, action);
};

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
