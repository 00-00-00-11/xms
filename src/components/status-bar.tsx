import React from "react";
import "../styles/status-bar/status-bar.scss";
import StatusItem from "./status-item";
import {faWifi, faSignal, faBell, faBellSlash, faGlobeAmericas, faBullseye, faUpload, faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {IAppState, ConnectionState} from "../store/store";
import {connect} from "react-redux";
import {MainApp} from "../index";
import StatusToggle from "./status-toggle";
import StatusSelect from "./status-select";
import StatusSelectItem from "./status-select-item";
import {Language} from "../core/localisation";

interface ILocalProps {
    readonly ping: number;
    readonly connectionState: ConnectionState;
    readonly groupAddress?: string;
}

class StatusBar extends React.Component<ILocalProps> {
    public renderPing(): string {
        if (this.props.ping < 1) {
            return "<1";
        }

        return this.props.ping.toString();
    }

    public renderConnectionState(): string {
        return ConnectionState[this.props.connectionState];
    }

    public render(): JSX.Element {
        return (
            <div className="status-bar">
                <div className="left">
                    <StatusItem tooltip="Upload meter" icon={faArrowUp}>12 KB</StatusItem>
                    <StatusItem tooltip="Download meter" icon={faArrowDown}>53 KB</StatusItem>
                </div>
                <div className="right">
                    <StatusSelect icon={faBullseye} text="State" title="Select State">
                        {/* TODO: States */}
                        <StatusSelectItem selected>Online</StatusSelectItem>
                        <StatusSelectItem disabled>Busy</StatusSelectItem>
                        <StatusSelectItem disabled>Away</StatusSelectItem>
                        <StatusSelectItem disabled>Offline</StatusSelectItem>
                    </StatusSelect>
                    <StatusToggle onClick={() => MainApp.toggleNotifications()} on={faBell} off={faBellSlash}>Notifications</StatusToggle>
                    <StatusSelect icon={faGlobeAmericas} text={MainApp.i18n.activeLanguage} title="Select Language">
                        {/* TODO: Languages */}
                        <StatusSelectItem selected>{Language.English}</StatusSelectItem>
                        <StatusSelectItem disabled>{Language.Spanish}</StatusSelectItem>
                        <StatusSelectItem disabled>{Language.MandarinChinese}</StatusSelectItem>
                        <StatusSelectItem disabled>{Language.Russian}</StatusSelectItem>
                    </StatusSelect>
                    <StatusItem icon={faSignal} tooltip="Connection latency">{this.renderPing()}ms</StatusItem>
                    <StatusItem
                        icon={faWifi}
                        loading={this.props.connectionState === ConnectionState.Connecting}
                        tooltip={`Connected to ${MainApp.gateway.groupAddress}`}
                        onClick={() => MainApp.gateway.toggleConnected()}>{this.renderConnectionState()}</StatusItem>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState): any => {
    return {
        ping: state.net.lastPing,
        connectionState: state.net.connectionState,
        groupAddress: state.net.groupAddress
    };
};

export default connect(mapStateToProps)(StatusBar);