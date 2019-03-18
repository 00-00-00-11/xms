import {Reducer, ActionType, IAppStateMessage, InitialState} from "../store/store";
import {ITextMessage, MessageType} from "../models/message";
import {Writeable} from "../models/misc";

const messageReducer: Reducer<IAppStateMessage> = (state, action) => {
    // Return default initial state for this reducer.
    if (!state) {
        return InitialState.message;
    }

    switch (action.type) {
        case ActionType.AddMessage: {
            return {
                ...state,

                // Set the new message.
                messages: state.messages.set(action.payload!.id, action.payload)
            };
        }

        case ActionType.MarkMessageSent: {
            if (!state.messages.has(action.payload!)) {
                throw new Error("Cannot mark message that does not exist");
            }

            const message: Writeable<ITextMessage> = Object.assign({}, state.messages.get(action.payload)!) as Writeable<ITextMessage>;

            // Only text messages may be marked as sent.
            if (message.type !== MessageType.Text) {
                throw new Error("Cannot mark non-text messages as sent");
            }
            
            // Mark message as sent.
            message.sent = true;

            return {
                ...state,
                messages: state.messages.set(message.id, message)
            };
        }

        case ActionType.ClearMessages: {
            return {
                ...state,
                messages: []
            };
        }
    }

    return state;
}

export default messageReducer;