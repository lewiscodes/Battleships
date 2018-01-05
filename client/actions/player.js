export const SELECT_SHIP = "SELECT_SHIP";
export const TOGGLE_SHIP_ROTATION = "TOGGLE_SHIP_ROTATION"

export function selectShip(shipId) {
    return {
        type: SELECT_SHIP,
        payload: shipId
    }
}

export function toggleShipRotation(shipId) {
    return {
        type: TOGGLE_SHIP_ROTATION,
        payload: shipId
    }
}