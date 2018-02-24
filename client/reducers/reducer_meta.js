import { SET_WIDTH, SET_BLOCK_SIZE, SET_TURN, SET_TURN_NUMBER } from '../actions/meta';

const INITIAL_STATE = { width: window.innerWidth, blockSize: (((window.innerWidth / 100) * 45) / 11), currentTurn: null, turnNumber: 0 };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_WIDTH:
            return {...state, width: action.payload};
        case SET_BLOCK_SIZE:
            return {...state, blockSize: action.payload};
        case SET_TURN:
            return {...state, currentTurn: action.payload};
        case SET_TURN_NUMBER:
        return {...state, turnNumber: action.payload};
        default:
            return state;
    }
}
