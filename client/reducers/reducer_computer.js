import { INIT_COMPUTER_SHIPS, ADD_SHIP, MAKE_GUESS } from '../actions/computer';
import { PLAYER_MAKE_GUESS } from '../actions/player'

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
                            1: {shipLength: 5, numberOfHits: 0, hitBlocks: [], sunk: false},
                            2: {shipLength: 4, numberOfHits: 0, hitBlocks: [], sunk: false},
                            3: {shipLength: 3, numberOfHits: 0, hitBlocks: [], sunk: false},
                            4: {shipLength: 3, numberOfHits: 0, hitBlocks: [], sunk: false},
                            5: {shipLength: 2, numberOfHits: 0, hitBlocks: [], sunk: false}
                        }
                    };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case INIT_COMPUTER_SHIPS:
        let newState_InitComputerShips = {...state.board};

        // updates the empty board with the positions of the randomly generated computer ships.
        Object.getOwnPropertyNames(action.payload).map((objectKey) => {
            newState_InitComputerShips[objectKey] = action.payload[objectKey]
        });

        return {...state, board: newState_InitComputerShips};
    case PLAYER_MAKE_GUESS:
        let newState_playerMakeGuess = {...state.board};
        let newState_makeGuess_ships = {...state.ships}
        newState_playerMakeGuess[action.payload].targeted = true;

        const shipID = newState_playerMakeGuess[action.payload].shipID;
        if (shipID !== undefined) {
            newState_makeGuess_ships[shipID].numberOfHits++;
            newState_makeGuess_ships[shipID].hitBlocks.push(action.payload);

            if (newState_makeGuess_ships[shipID].numberOfHits === newState_makeGuess_ships[shipID].shipLength) {
                newState_makeGuess_ships[shipID].sunk = true;
            }
        }
        

        return {...state, board: newState_playerMakeGuess}
    default:
        return state;
  }
}
