export interface IChannel {
    readonly id: UniqueId;
    readonly type: ChannelType;
    readonly topic: string;
    readonly name: string;
}

export enum NoticeStyle {
    Success,
    Warning,
    Error
}

export interface IModal {
    readonly title: string;
    readonly text: string;
    readonly onClose?: () => void;
}

export interface IAutoCompleteItem {
    readonly id: string;
    readonly name: string;
    readonly subtext?: string;
}

export enum Page {
    Init,
    Default
}

export enum ChannelType {
    Public,
    Text
}

export enum MessageType {
    Text,
    Notice
}

export interface IGenericMessage {
    readonly type: MessageType;
    readonly id: UniqueId;
    readonly channelId: UniqueId;
    readonly text: string;
    readonly time: number;
}

export interface IMessage extends IGenericMessage {
    readonly authorName: string;
    readonly authorAvatarUrl: string;
    readonly systemMessage: boolean;
    readonly sent: boolean;
}

export interface INotice extends IGenericMessage {
    readonly style: NoticeStyle;
}

export enum UserState {
    Online,
    Away,
    Busy,
    Offline
}

export enum SpecialCategories {
    Connected = "connected",
    Offline = "offline"
}

export type User = {
    readonly id: UniqueId;
    readonly username: string;
    readonly status?: string;
    readonly avatarUrl?: string;
    readonly state: UserState;
    readonly createdTime: number;
}

export type IRoosterCategory = {
    readonly id: UniqueId;
    readonly name: string;
    readonly users: UniqueId[];
}

export type UniqueId = string;