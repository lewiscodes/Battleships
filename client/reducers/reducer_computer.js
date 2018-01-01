import { INIT_COMPUTER_SHIPS, ADD_SHIP } from '../actions/computer';

const buildBoard = () => {
    let board = {};

    for (let x=0; x<100; x++) {
        board[x] = {id: x, containsShip: false, targeted: false};
    }

    return board;
}

const INITIAL_STATE = {
                        board: buildBoard(),
                        ships: {
                            1: {shipLength: 5},
                            2: {shipLength: 4},
                            3: {shipLength: 3},
                            4: {shipLength: 3},
                            5: {shipLength: 2}
                        }
                    };

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
