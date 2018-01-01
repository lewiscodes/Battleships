import { INIT_COMPUTER_SHIPS, ADD_SHIP } from '../actions/index';

const buildBoard = () => {
    let board = {};

    for (let x=0; x<100; x++) {
        board[x] = {id: x, containsShip: false, targeted: false};
    }

    return board;
}

const INITIAL_STATE = { board: buildBoard(), ships: {} };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case INIT_COMPUTER_SHIPS:
        let newState = {...state.board};

        // updates the empty board with the positions of the randomly generated computer ships.
        Object.getOwnPropertyNames(action.payload).map((objectKey) => {
            newState[objectKey] = action.payload[objectKey]
        });

        return {...state, board: newState};
    default:
        return state;
  }
}
