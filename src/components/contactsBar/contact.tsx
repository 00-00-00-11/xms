import React from "react";
import "@/styles/roster/rosterItem.scss";
import Tooltip, {TooltipPosition} from "../tooltip";
import PlaceholderAvatar from "../placeholder/avatar";

type Props = {
    readonly username: string;

    readonly avatarUrl?: string;

    readonly status?: string;

    readonly me?: boolean;
};

export default class Contact extends React.Component<Props> {
    public getComponentStyle(): string {
        const classes: string[] = ["roster-item"];

        // TODO: Check here if item is local user (import store, etc)
        if (this.props.me) {
            classes.push("me");
        }

        return classes.join(" ");
    }

    public renderAvatar(): JSX.Element {
        if (this.props.avatarUrl !== undefined) {
            return <img className="avatar" src={this.props.avatarUrl} />;
        }

        return <PlaceholderAvatar username={this.props.username} />;
    }

    public renderContent(): JSX.Element {
        return (
            <div className={this.getComponentStyle()}>
                {/* TODO: Temp. unknown avatar image */}
                {this.renderAvatar()}
                <div className="info-wrapper">
                    <div className="name">{this.props.username}</div>
                    <div className="status">{this.props.status}</div>
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        if (!this.props.me) {
            return this.renderContent();
        }
        else {
            return (
                <Tooltip position={TooltipPosition.Left} style={{
                    display: "block",

                    // TODO: Should be :not(:last-child).
                    marginBottom: "5px"
                }} text="That's you!">
                    {this.renderContent()}
                </Tooltip>
            );
        }
    }
}
