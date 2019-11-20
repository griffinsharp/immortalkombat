import { combineReducers } from "redux";
import session from "./session_reducer";
import game from "./game_reducer";
import errors from "./errors_reducer";

const RootReducer = combineReducers({
    session,
    game,
    errors
});

export default RootReducer;
