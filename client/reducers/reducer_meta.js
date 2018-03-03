import { SET_WIDTH, SET_BLOCK_SIZE, SET_TURN, SET_TURN_NUMBER, SET_TICKER_TEXT } from '../actions/meta';

const INITIAL_STATE = { width: window.innerWidth, blockSize: (((window.innerWidth / 100) * 45) / 11), currentTurn: null, turnNumber: 0, ticker: [] };

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
        case SET_TICKER_TEXT:
            // if this item in the array doesn't already exist, create it
            if (state.ticker.length === action.payload.tickerNumber) {
                state.ticker.push(action.payload.text);
                return state;
            }

            // if this item already exists in the array, update it with the next letter.
            const updatedState = {...state, ticker: state.ticker.map((item, index) => {
                if (index === action.payload.tickerNumber) {
                    return action.payload.text;
                } else {
                    return item;
                }
            })};

            return updatedState;
        default:
            return state;
    }
}
