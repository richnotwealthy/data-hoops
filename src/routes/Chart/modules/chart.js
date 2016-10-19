// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_SELECT = 'PLAYER_SELECT'

// ------------------------------------
// Actions
// ------------------------------------
export function playerSelect (value) {
  return {
    type    : PLAYER_SELECT,
    payload : value
  }
}

export const actions = {
  playerSelect
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLAYER_SELECT] : (state, action) => {
      return {
          ...state,
          id: action.payload.id,
          name: action.payload.name
      }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    id: '2546',
    name: 'Carmelo Anthony',
    year: '2015-16',
    team: 'NYK'
}
export default function chartReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  var retVal = handler ? handler(state, action) : state
  console.log(retVal)
  return retVal
}