import React from "react";
import "../styles/roster-category.scss";
import RosterItem from "./roster-item";
import {User, UniqueId} from "../types/types";
import {IAppState} from "../store/store";
import {connect} from "react-redux";

interface ILocalProps {
    readonly title: string;
    readonly users: User[];
    readonly meId: UniqueId | null;
}

class RosterCategory extends React.Component<ILocalProps> {
    public renderUsers(): JSX.Element[] {
        return this.props.users.map((user: User) => {
            return <RosterItem
                key={user.id}
                me={this.props.meId !== null && user.id === this.props.meId}
                name={user.username}
                avatarUrl={user.avatarUrl}
                status={user.status} />;
        });
    }

    public render(): JSX.Element {
        return (
            <div className="rooster-category">
                <div className="title">{this.props.title} &mdash; {this.props.users.length}</div>
                <div className="users">
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): any => {
    return {
        meId: state.category.me ? state.category.me.id : null
    };
};

export default connect(mapStateToProps)(RosterCategory);
