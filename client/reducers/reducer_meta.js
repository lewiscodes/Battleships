import { SET_WIDTH } from '../actions/index';

const INITIAL_STATE = { width: window.innerWidth };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_WIDTH:
            return {...state, width: action.payload};
        default:
            return state;
    }
}
