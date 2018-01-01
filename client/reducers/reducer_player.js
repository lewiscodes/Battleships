import {  } from '../actions/index';

const buildBoard = () => {
    let board = {};

    for (let x=0; x<100; x++) {
        board[x] = {id: x, containsShip: false, targeted: false};
    }

    return board;
}

const INITIAL_STATE = { board: buildBoard() };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
}
