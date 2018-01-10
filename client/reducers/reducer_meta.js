import { SET_WIDTH, SET_BLOCK_SIZE, SET_TURN } from '../actions/meta';

const INITIAL_STATE = { width: window.innerWidth, blockSize: (((window.innerWidth / 100) * 45) / 11), currentTurn: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_WIDTH:
            return {...state, width: action.payload};
        case SET_BLOCK_SIZE:
            return {...state, blockSize: action.payload};
        case SET_TURN:
            return {...state, currentTurn: action.payload};
        default:
            return state;
    }
}
