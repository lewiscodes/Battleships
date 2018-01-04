export const INIT_COMPUTER_SHIPS = "INIT_COMPUTER_SHIPS";
export const ADD_SHIP = "ADD_SHIP";
export const MAKE_GUESS = "MAKE_GUESS";

export function initialiseComputerShips(ships) {
    let usedBlocks = {};

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

export function makeGuess(currentPlayerBoard, playersCurrentShips) {
    let guess = 0;
    console.log("computer is making a guess");
    if (hasAShipBeenHitButNotSunk(playersCurrentShips)) {
        console.log("existing hit detected");
        guess = tryToFindExistingShip(currentPlayerBoard, playersCurrentShips)
    } else {
        console.log("no existing hit detected");
        guess = makeNewGuess(currentPlayerBoard);
        // ------------------
        // hard coded a guess
        guess = 1;
        // ------------------
    }

    console.log("guess is: ", guess);

    return {
        type: MAKE_GUESS,
        payload: guess
    };
}

function hasAShipBeenHitButNotSunk(playersCurrentShips) {
    for (let x=0; x<Object.keys(playersCurrentShips).length; x++) {
        if (playersCurrentShips[x+1].numberOfHits > 0 && !playersCurrentShips[x+1].sunk) {
            return true;
        }
    }

    return false;
}

function makeNewGuess(currentPlayerBoard) {
    let guess = null;
    while (guess === null) {
        let guessAttempt = Math.floor( Math.random() * 99 )
         if (!currentPlayerBoard[guessAttempt].targeted) {
            guess = guessAttempt
         }
    }
    return guess;
}

function tryToFindExistingShip(currentPlayerBoard, playersCurrentShips) {
    let hitShip = null;
    for (let x=0; x < Object.keys(playersCurrentShips).length; x++) {
        const ship = playersCurrentShips[x+1];
        if (ship.hitBlocks.length > 0 && !ship.sunk) {
            hitShip = ship;
        }
    }

    console.log(hitShip);

    if (hitShip.hitBlocks.length === 1) {
        let guess = null;
        while (guess === null) {
            // 1 = up, 2 = left, 3 = right, 4 = down
            const randomDirection = Math.floor( Math.random() * 4 );
            let guessAttempt = null;
            if (randomDirection === 1) {
                guessAttempt = hitShip.hitBlocks[0] + 10;
            } else if (randomDirection === 2) {
                guessAttempt = hitShip.hitBlocks[0] - 1;
            } else if (randomDirection === 3) {
                guessAttempt = hitShip.hitBlocks[0] + -10;
            } else {
                guessAttempt = hitShip.hitBlocks[0] + 1;
            }

            if (doesGuessFitOnTheBoard(hitShip.hitBlocks[0], guessAttempt)) {
                guess = guessAttempt;
            }

            guess = 3;
        }
    } else {
        // calculate which direction to go (up and down or left and right)
    }


    
    
    return 2
}

function doesGuessFitOnTheBoard(originalBlock, guess) {
    console.log(originalBlock);
    console.log(guess);

    if () {
        return false;
    }
}