import { RECEIVE_GAMEROOM} from "../actions/game_actions";

export default function (state = {}, action) {
    switch (action.type) {
        case RECEIVE_GAMEROOM:
            return Object.assign({}, state, {room: action.room});
        default:
            return state;
    }
}