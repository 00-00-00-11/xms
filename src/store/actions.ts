import {User, UniqueId, IGenericMessage, Page} from "../types/types";
import {store, ActionType} from "./store";
import {ICommand} from "../core/command";

export default abstract class Actions {
    public static addMessage<T extends IGenericMessage>(message: T): void {
        store.dispatch({
            type: ActionType.AddMessage,
            payload: message
        });
    }

    public static markMessageSent(messageId: UniqueId): void {
        store.dispatch({
            type: ActionType.MarkMessageSent,
            payload: messageId
        });
    }

    public static addUser(user: User): void {
        store.dispatch({
            type: ActionType.AddUser,
            payload: user
        });
    }

    public static setActiveChannel(channelId: UniqueId): void {
        store.dispatch({
            type: ActionType.SetActiveChannel,
            payload: channelId
        });
    }

    public static setGeneralAsActiveChannel(): void {
        store.dispatch({
            type: ActionType.SetGeneralAsActiveChannel
        });
    }

    public static setInputLocked(locked: boolean): void {
        store.dispatch({
            type: ActionType.SetInputLocked,
            payload: locked
        });
    }

    public static setPage(page: Page): void {
        store.dispatch({
            type: ActionType.SetPage,
            payload: page
        });
    }

    public static setAutoCompleteVisible(visible: boolean): void {
        store.dispatch({
            type: ActionType.SetAutoCompleteVisible,
            payload: visible
        });
    }

    public static registerCommand(command: ICommand): void {
        store.dispatch({
            type: ActionType.RegisterCommand,
            payload: command
        });
    }

    public static registerCommands(commands: ICommand[]): void {
        for (let i = 0; i < commands.length; i++) {
            Actions.registerCommand(commands[i]);
        }
    }
}