// ------------------------------------
// Constants
// ------------------------------------
export const PLAYER_SELECT = 'PLAYER_SELECT'
export const YEAR_SELECT = 'YEAR_SELECT'

// ------------------------------------
// Actions
// ------------------------------------
export function playerSelect (value) {
  return {
    type    : PLAYER_SELECT,
    payload : value
  }
}

export function yearSelect (value) {
  return {
    type    : YEAR_SELECT,
    payload : value
  }
}

export const actions = {
  playerSelect,
  yearSelect
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLAYER_SELECT] : (state, action) => {
      return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          team: action.payload.team
      }
  },
  [YEAR_SELECT] : (state, action) => {
      return {
          ...state,
          year: action.payload
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
    team: 'Knicks'
}
export default function chartReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}