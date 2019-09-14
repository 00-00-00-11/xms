import React, {Component, RefObject} from "react";
import {IGenericMessage, MessageType, ITextMessage, INotice, IBreakMessage} from "@/models/message";
import ChatMessage from "./chatMessage";
import NoticeMessage from "./noticeMessage";
import BreakMessage from "./breakMessage";
import Loader from "../loader";
import {connect} from "react-redux";
import {IAppState} from "@/store/store";
import "@/styles/chat/chatContainer.scss";
import {BasicMap} from "@/core/helper";

interface IProps {
    readonly messages: BasicMap<IGenericMessage>;
    readonly offsetMultiplier: number;
}

interface IState {
    readonly offset: number;
    readonly status: string | undefined;
}

class ChatContainer extends Component<IProps, IState> {
    private readonly $container: RefObject<any> = React.createRef();

    public state: IState = {
        offset: 0,
        status: undefined
    };

    public componentDidUpdate(prevProps: IProps, prevState: IState): void {
        // Scroll messages when messages prop changes, and when status is shown/hidden
        // TODO: isScrolled() will not work on this position, since it has already been scrolled automatically.
        if (this.isScrolled() && prevProps.messages && this.props.messages.size !== prevProps.messages.size
            || (prevState.status !== this.state.status && (!prevState.status || !this.state.status))) {
            this.scrollMessages();
        }

        // TODO: Possibly messing up stuff.
        //this.$messages.current.scrollTop = this.$messages.current.scrollHeight;
    }

    protected scrollMessages(): void {
        if (!this.isScrolled()) {
            this.$container.current.scrollTop = this.$container.current.scrollHeight;
        }
    }

    protected handleScroll(): void {
        // TODO: Hard-coded threshold.
        if (this.props.messages.size < 15) {
            return;
        }
        else if (this.$container.current.scrollTop === 0) {
            this.loadOlderMessages();
        }
    }

    protected isScrolled(): boolean {
        return this.$container.current.scrollTop >= this.$container.current.scrollHeight;
    }

    protected loadOlderMessages(): void {
        // TODO: Timeout for debugging (slower).
        setTimeout(() => {
            this.setState({
                offset: this.state.offset + 1
            });
        }, 1500);
    }

    protected renderLoader(): JSX.Element | undefined {
        // TODO: Hard-coded threshold.
        if (this.props.messages.size >= 15) {
            if (this.$container.current && this.$container.current.scrollTop === 0) {
                if (this.props.offsetMultiplier * this.state.offset > this.props.messages.size) {
                    return <div className="beginning-of-history">Beginning of history</div>;
                }

                this.loadOlderMessages();
            }

            return <Loader text="Loading messages" />;
        }
    }

    protected renderMessages(): JSX.Element[] {
        const messageMap: BasicMap<IGenericMessage> = this.props.messages;

        let messages: IGenericMessage[] = [];

        // TODO: Hard-coded cut value.
        const threshold: number = 100;

        for (const message of messageMap.values()) {
            // Stop if threshold has been met.
            if (messages.length >= threshold) {
                break;
            }

            // Otherwise, append the message.
            messages.push(message);
        }

        //console.log(messages);

        // TODO: Debugging commented out.
		/* if (this.offset !== messages.length) {
			messages = messages.slice(-this.offset);
		} */

        //console.log(messages);

        return messages.map((message: IGenericMessage) => {
            // Normal text message.
            if (message.type === MessageType.Text) {
                const textMessage: ITextMessage = message as ITextMessage;

                return <ChatMessage
                    key={message.id}
                    sent={textMessage.sent}
                    authorName={textMessage.authorName}
                    authorAvatarHash={textMessage.authorAvatarHash}
                    text={message.text}
                    time={textMessage.time}
                    systemMessage={textMessage.systemMessage}

                    // TODO: Add & use a 'mentions' property, calculated when the message is sent?
                    notify={false}
                />;
            }
            // Notice message.
            else if (message.type === MessageType.Notice) {
                const notice: INotice = message as INotice;

                return <NoticeMessage
                    key={message.id}
                    style={notice.style}
                    text={message.text}
                />;
            }
            // Break message.
            else if (message.type === MessageType.Break) {
                const breakMessage: IBreakMessage = message as IBreakMessage;

                return <BreakMessage
                    key={message.id}
                    important={breakMessage.important}
                    content={breakMessage.text}
                />;
            }
            // Otherwise, the message type is invalid.
            else {
                throw new Error(`Unknown message type: ${message.type}`);
            }
        });
    }

    public render(): JSX.Element {
        return (
            <div ref={this.$container} onScroll={this.handleScroll} className="chat-container">
                {this.renderLoader()}
                {this.renderMessages()}
            </div>
        );
    }
}

export default connect((state: IAppState): any => {
    return {
        messages: state.message.messages
    };
})(ChatContainer);
