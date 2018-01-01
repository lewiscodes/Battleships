export const SET_WIDTH = "SET_WIDTH";
export const INIT_COMPUTER_SHIPS = "INIT_COMPUTER_SHIPS";
export const ADD_SHIP = "ADD_SHIP";

export function setWidth() {
    return {
        type: SET_WIDTH,
        payload: window.innerWidth
    };
}

export function initialiseComputerShips(dispatch) {
    let usedBlocks = {};
    let ships = {
        1: {shipLength: 5},
        2: {shipLength: 4},
        3: {shipLength: 3},
        4: {shipLength: 3},
        5: {shipLength: 2}
    }

    // loops through each ship
    for (let x=0; x<Object.keys(ships).length; x++) {
        let randomShipSuccessful = false;

        // keeps trying until all of validation succeeds on a randomly generated ship position
        while (randomShipSuccessful === false) {
            randomShipSuccessful = true;
            ships[x+1] = randomlyPlaceShip(ships[x+1].shipLength, ships);
            const ship = ships[x+1];
            const startingPosition = (ship.xAxis * 10) + ship.yAxis;
            let shipUsedBlocks = {};

            // checks to make sure the starting block of a ship has not already been used.
            if (!(startingPosition in usedBlocks)) {
                Object.defineProperty(shipUsedBlocks, startingPosition, {value: {id: startingPosition, containsShip: true, targeted: false, shipID: x+1}});
            } else {
                randomShipSuccessful = false;
            };

            if (ship.verticalOrHorizontal === 'vertical') {
                for (let y=1; y<ship.shipLength; y++) {
                    // checks to see if any of the blocks taken up by the ship have already been used and that the ship doesn't go off the edge of the board
                    if (!(startingPosition + (y * 10) in usedBlocks) && (startingPosition + (y * 10) <= 99)) {
                        Object.defineProperty(shipUsedBlocks, startingPosition + (y * 10), {value: {id: startingPosition + (y * 10), containsShip: true, targeted: false, shipID: x+1}});
                    } else {
                        randomShipSuccessful = false;
                    };
                };
            } else {
                for (let y=1; y<ship.shipLength; y++) {
                    // gets the last possible square on the row
                    const highestPossibleWithoutLineBreak = (Math.ceil(startingPosition / 10) * 10) -1;
                    
                    // checks to see if any of the blocks taken up by the ship have already been used and that the ship doesn't go off the edge of the board or the end of it's own line
                    if (!(startingPosition + y in usedBlocks) && (startingPosition + y <= 99) && (startingPosition + y <= highestPossibleWithoutLineBreak)) {
                        Object.defineProperty(shipUsedBlocks, startingPosition + y, {value: {id: startingPosition + y, containsShip: true, targeted: false, shipID: x+1}});
                    } else {
                        randomShipSuccessful = false;
                    };
                };
            };

            if (randomShipSuccessful === true) {
                // adds the blocks used for this ship to the list of used blocks.
                Object.getOwnPropertyNames(shipUsedBlocks).map((block) => {
                    Object.defineProperty(usedBlocks, block, {value: {...shipUsedBlocks[block]}});
                });
            }
        }
    }

    return {
        type: INIT_COMPUTER_SHIPS,
        payload: usedBlocks
    };
}

function randomlyPlaceShip(shipLength, ships) {
    let successful = false;

    while (successful === false) {
        // randomly assigns the ship a vertical or horizontal value
        const verticalOrHorizontal = (Math.floor( Math.random() * 2 ) + 1) === 1 ? 'vertical' : 'horizontal';
        // randomly assigns the ship an x-axis and y-axis value
        const xAxis = Math.floor( Math.random() * 10 );
        const yAxis = Math.floor( Math.random() * 10 );

        // checks to see if the randomly placed ship fits on the board
        if ((verticalOrHorizontal === 'vertical' && yAxis + shipLength <= 9) || (verticalOrHorizontal === 'horizontal' && xAxis + shipLength <= 9))  {
            
            successful = true;
            return {
                verticalOrHorizontal: verticalOrHorizontal,
                xAxis: xAxis,
                yAxis: yAxis,
                shipLength: shipLength
            }
        }
    }
}