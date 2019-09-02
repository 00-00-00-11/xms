import React, {CSSProperties} from "react";
import "../styles/misc/tooltip.scss";
import {CSSTransition} from "react-transition-group";

export enum TooltipPosition {
    Top = "top",

    Right = "right",

    Left = "left",

    Bottom = "bottom"
}

interface IProps {
    readonly style?: CSSProperties;

    /**
     * The text to display upon hover.
     */
    readonly text: string;

    /**
     * The position in which the tooltip will be displayed. Default to top.
     */
    readonly position?: TooltipPosition;

    /**
     * Whether the tooltip element is visible. Defaults to true.
     */
    readonly visible?: boolean;
}

interface IState {
    /**
     * Whether the tooltip is currently visible.
     */
    readonly visible: boolean;
}

export default class Tooltip extends React.Component<IProps, IState> {
    public static readonly defaultProps: Partial<IProps> = {
        position: TooltipPosition.Top,
        visible: true
    };

    protected readonly $tooltip: React.RefObject<any>;

    public constructor(props: IProps) {
        super(props);

        // Bindings.
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.setVisibility = this.setVisibility.bind(this);

        // Refs.
        this.$tooltip = React.createRef();
    }

    public componentWillMount(): void {
        this.setState({
            visible: false
        });
    }

    // TODO
    public componentDidMount(): void {
        //this.positionFix();
    }

    // TODO
    public componentWillUpdate(): void {
        //this.positionFix();
    }

    public setVisibility(visible: boolean): void {
        if (this.state.visible !== visible) {
            this.setState({
                visible
            });
        }
    }

    /**
     * Fixes possible out-of-bounds positioning after every update.
     */
    public positionFix(): CSSProperties | undefined {
        if (this.$tooltip.current === null) {
            return undefined;
        }

        // TODO: Finish implementing.
        let move: number = 0;

        //console.log(Object.keys(this.$tooltip.current));

        return undefined;
    }

    public show(): void {
        this.setVisibility(true);
    }

    public hide(): void {
        this.setVisibility(false);
    }

    public getStyle(): CSSProperties {
        return {
            display: this.props.visible === true ? "block" : "none",
            ...this.props.style
        };
    }

    public render(): JSX.Element {
        return (
            <div style={this.getStyle()} onMouseOver={this.show} onMouseLeave={this.hide} className="tooltip-container">
                <CSSTransition in={this.state.visible} classNames="trans" timeout={200}>
                    <div ref={this.$tooltip} style={this.positionFix()} data-position={this.props.position} className="tooltip">{this.props.text}</div>
                </CSSTransition>
                {this.props.children}
            </div>
        );
    }
}
