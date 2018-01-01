import { combineReducers } from 'redux';
import PlayerReducer from './reducer_player';
import ComputerReducer from './reducer_computer';
import MetaReducer from './reducer_meta';

const rootReducer = combineReducers({
    player: PlayerReducer,
    meta: MetaReducer,
    computer: ComputerReducer
});

export default rootReducer;
