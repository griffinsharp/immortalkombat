export const RECEIVE_GAMEROOM = "RECEIVE_GAMEROOM";

export const addGameRoom = room => ({
    type: RECEIVE_GAMEROOM,
    room
});