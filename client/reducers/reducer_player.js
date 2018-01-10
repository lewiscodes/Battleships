import _ from 'lodash';
import { MAKE_GUESS } from '../actions/computer';
import { SELECT_SHIP, DESELECT_SHIP, TOGGLE_SHIP_ROTATION, PLACE_SHIP } from '../actions/player';

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
        1: {Id: 1, shipLength: 5, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        2: {Id: 2, shipLength: 4, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        3: {Id: 3, shipLength: 3, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        4: {Id: 4, shipLength: 3, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        5: {Id: 5, shipLength: 2, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false}
    }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case MAKE_GUESS:
        let newState_makeGuess_board = {...state.board};
        let newState_makeGuess_ships = {...state.ships};
        newState_makeGuess_board[action.payload].targeted = true;

        const shipID = newState_makeGuess_board[action.payload].shipId;
        console.log(shipID);
        
        if (shipID !== undefined) {
            newState_makeGuess_ships[shipID].numberOfHits++;
            newState_makeGuess_ships[shipID].hitBlocks.push(action.payload);

            if (newState_makeGuess_ships[shipID].numberOfHits === newState_makeGuess_ships[shipID].shipLength) {
                newState_makeGuess_ships[shipID].sunk = false;
            }
        }
        return {...state, board: newState_makeGuess_board, ships: newState_makeGuess_ships};
    case SELECT_SHIP:
        let newState_selectShip = {...state.ships};
        for (let x=0; x<Object.keys(newState_selectShip).length; x++) {
            if (action.payload === (x+1).toString()) {
                newState_selectShip[x+1].selected = true;
            } else {
                newState_selectShip[x+1].selected = false;
            }
        }
        return {...state, ships: newState_selectShip}
    case DESELECT_SHIP:
        let newState_deselectShip = {...state.ships};
        newState_deselectShip[action.payload].selected = false;
        return {...state, ships: newState_deselectShip}
    case TOGGLE_SHIP_ROTATION:
        let newState_toggleShipRotation = {...state.ships};
        for (let x=0; x<Object.keys(newState_toggleShipRotation).length; x++) {
            if (action.payload === (x+1).toString()) {
                if (newState_toggleShipRotation[x+1].rotation === 'horizontal') {
                    newState_toggleShipRotation[x+1].rotation = 'vertical';
                } else {
                    newState_toggleShipRotation[x+1].rotation = 'horizontal';
                }
            }
        }
        return {...state, ships: newState_toggleShipRotation}
    case PLACE_SHIP:
        let newState_placeShip_Board = {...state.board};
        let newState_placeShip_Ships = {...state.ships};

        for (let x=0; x<action.payload.shipBlocks.length; x++) {
            newState_placeShip_Board[action.payload.shipBlocks[x]] = {id: action.payload.shipBlocks[x], containsShip: true, targeted: false};
        }
        
        newState_placeShip_Ships[action.payload.shipId].placed = true;
        return {...state, ships: newState_placeShip_Ships, board: newState_placeShip_Board}
    default:
        return state;
  }
}
