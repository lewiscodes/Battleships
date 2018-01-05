import { MAKE_GUESS } from '../actions/computer';
import { SELECT_SHIP, TOGGLE_SHIP_ROTATION } from '../actions/player';

const buildBoard = () => {
    let board = {};

    for (let x=0; x<100; x++) {
        // --------------------------------------------------------------------------------------------------
        // this is just to add dummy player ships, it can be removed once the player can add their own ships.
        // --------------------------------------------------------------------------------------------------
        let containsShipIndicator = false;
        let thisShipId = null;
        if (x==0||x==1||x==2||x==3||x==4||x==56||x==57||x==58||x==59||x==71||x==72||x==72||x==20||x==30||x==40||x==88||x==98) {
            containsShipIndicator = true;
            if (x==0||x==1||x==2||x==3||x==4) {
                thisShipId = 1;
            } else if (x==56||x==57||x==58||x==59) {
                thisShipId = 2;
            } else if (x==71||x==72||x==72) {
                thisShipId = 3;
            } else if (x==20||x==30||x==40) {
                thisShipId = 4;
            } else if (x==88||x==98) {
                thisShipId = 5;
            }
        }
        board[x] = {id: x, containsShip: containsShipIndicator, targeted: false, shipId: thisShipId};
        // ---------------------------------------------------------------
        // this can be re-instated once the player can add their own ships.
        // board[x] = {id: x, containsShip: false, targeted: false};
        // ---------------------------------------------------------------
    }

    return board;
}

const INITIAL_STATE = {
    board: buildBoard(),
    ships: {
        1: {shipLength: 5, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        2: {shipLength: 4, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        3: {shipLength: 3, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        4: {shipLength: 3, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false},
        5: {shipLength: 2, selected: false, rotation: 'horizontal', placed: false, numberOfHits: 0, hitBlocks: [], sunk: false}
    }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case MAKE_GUESS:
        let newState_makeGuess = {...state.board};
        newState_makeGuess[action.payload].targeted = true;

        if (newState_makeGuess[action.payload].shipId !== null) {
            // -----------------------------------------------------------------------
            // call another action to update the ship with a hit and sink if necessary
            // -----------------------------------------------------------------------
        }
        return {...state, board: newState_makeGuess};
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
    default:
        return state;
  }
}
