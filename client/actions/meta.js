export const SET_WIDTH = "SET_WIDTH";
export const SET_BLOCK_SIZE = "SET_BLOCK_SIZE";
export const SET_TURN = "SET_TURN";
export const SET_TURN_NUMBER = "SET_TURN_NUMBER";
export const SET_TICKER_TEXT = "SET_TICKER_TEXT";

export function setWidth() {
    return {
        type: SET_WIDTH,
        payload: window.innerWidth
    };
}

export function setBlockSize() {
    return {
        type: SET_BLOCK_SIZE,
        payload: (((window.innerWidth / 100) * 45) / 11)
    }
}

export function setTurn(turn) {
    return {
        type: SET_TURN,
        payload: turn
    }
}

export function setTurnNumber(lastTurnNumber) {
    lastTurnNumber++;
    
    return {
        type: SET_TURN_NUMBER,
        payload: lastTurnNumber
    }
}

export function addTextToTicker(text, nextTickerNumber) {
    return (dispatch) => {
        let existingText = '';
        for (let x = 0; x < text.length; x++) {
            setTimeout(() => {
                // console.log('text[x]', text[x]);
                existingText+= text[x];
                // // console.log('existingText', existingText);
                dispatch({
                    type: SET_TICKER_TEXT,
                    payload: {text: existingText, tickerNumber: nextTickerNumber}
                });
            }, x *50);
        }
    }
}