import {Reducer, ActionType} from "../store";

const userReducer: Reducer = (state, action) => {
    if (!state) {
        return null;
    }

    switch (action.type) {
        case ActionType.UpdateMe: {
            return {
                ...state,

                me: {
                    ...action.payload
                }
            };
        }

        case ActionType.AddUser: {
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        }

        case ActionType.UpdateUser: {
            // TODO
            throw new Error("Not yet implemented");
        }
    }

    return state;
}

export default userReducer;