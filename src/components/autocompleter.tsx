import React from "react";
import "../styles/auto-completer.scss";
import {IAutoCompleteItem} from "../types/types";
import {CSSTransition} from "react-transition-group";

type AutocompleterProps = {
	readonly visible: boolean;
	readonly items: IAutoCompleteItem[];
	readonly title: string;
	readonly onItemClick?: (item: IAutoCompleteItem) => void;
}

export default class Autocompleter extends React.Component<AutocompleterProps> {
	public constructor(props: AutocompleterProps) {
		super(props);

		// Bindings
		this.handleItemClick = this.handleItemClick.bind(this);
	}

	public handleItemClick(item: IAutoCompleteItem): void {
		if (this.props.onItemClick) {
			this.props.onItemClick(item);
		}
	}

	public renderItems(): JSX.Element[] {
		return this.props.items.map((item: IAutoCompleteItem, index: number) => {
			return <div onClick={() => this.handleItemClick(item)} key={item.id} tabIndex={index + 1} className="option">
				<div className="name">{item.name}</div>
				{item.subtext !== undefined &&
					<div className="subtext">{item.subtext}</div>
				}
			</div>;
		});
	}

	public render(): JSX.Element | null {
		if (this.props.items.length === 0) {
			return null;
		}

		return (
			<CSSTransition in={this.props.visible} classNames="trans" timeout={400}>
				<div className="auto-completer">
					<div className="title">{this.props.title}</div>
					{this.renderItems()}
				</div>
			</CSSTransition>
		);
	}
}
