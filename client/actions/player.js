import { setTurn } from '../actions/meta'

export const SELECT_SHIP = "SELECT_SHIP";
export const TOGGLE_SHIP_ROTATION = "TOGGLE_SHIP_ROTATION";
export const PLACE_SHIP = "PLACE_SHIP";
export const DESELECT_SHIP = "DESELECT_SHIP";
export const PLAYER_MAKE_GUESS = "PLAYER_MAKE_GUESS";

export function selectShip(shipId) {
    return {
        type: SELECT_SHIP,
        payload: shipId
    }
}

function deselectShip(shipId) {
    return {
        type: DESELECT_SHIP,
        payload: shipId
    }
}

export function toggleShipRotation(shipId) {
    return {
        type: TOGGLE_SHIP_ROTATION,
        payload: shipId
    }
}

export function placeShip(shipId, shipBlocks) {
    return (dispatch) => {
        dispatch ({
            type: PLACE_SHIP,
            payload: {shipId: shipId, shipBlocks: shipBlocks}
        });

        dispatch(deselectShip(shipId));
    };
}

export function playerMakeGuess(blockId, hit) {
    return (dispatch) => {
        dispatch({
            type: PLAYER_MAKE_GUESS,
            payload: blockId
        });

        if (!hit) {
            dispatch(setTurn('computer'));
        }
    };
}