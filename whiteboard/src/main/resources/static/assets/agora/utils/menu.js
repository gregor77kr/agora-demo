const PagePreviewPositionEnum = {
	left: "left",
	right: "right"
};

const styles = {
	bmMenu: {
		boxShadow: "0 8px 24px 0 rgba(0,0,0,0.15)",
	},
	bmBurgerButton: {
		display: "none",
	},
};

const styles2 = {
	bmBurgerButton: {
		display: "none",
	},
};


class MenuBox {

	constructor(props) {
		// isVisible, onMenuState, width, pagePreviewPosition
		this.props = props;

		this.state = {
			menuStyles: this.props.isVisible ? styles : styles2,
			isMenuOpen: false
		};
	}

	render = () => {
		const width = this.props.width;
		const pagePreviewPosition = this.props.pagePreviewPosition;
		const isRight = pagePreviewPosition !== PagePreviewPositionEnum.left;
	}
}

export { MenuBox };