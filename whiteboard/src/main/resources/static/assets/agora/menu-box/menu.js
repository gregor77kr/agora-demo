import DomCreator from '../utils/DomCreator.js'

/**
 * TO-DO : missing css
 */
const PagePreviewPositionEnum = {
	left = "left",
	right = "right",
}

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

class MenuBox extends DomCreator {

	constructor(props) {
		super(props);

		this.state = {
			menuStyles: this.props.isVisible ? styles : styles2,
			isMenuOpen: false,
		}
	}

	getMenuStyle = async (isOpen) => {
		if (isOpen) {
			this.state.menuStyles = styles;
		} else {
			await timeout(200);
			this.state.menuStyles = styles2;
		}
	}

	render = () => {
		const { pagePreviewPosition, width, onMenuState } = this.props;
		const isRight = pagePreviewPosition !== PagePreviewPositionEnum.left;

		// menu-wrap
		const divMenuWrap = this.createElement({
			type: 'div',
			classes: ['bm-menu-wrap'],
			style: 'position: fixed; right: 0px; z-index: 1100; width: 240px; height: 100%; transition: all 0.5s ease 0s;'
		});

		// menu
		const divMenu = this.createElement({
			type: 'div',
			classes: ['bm-menu'],
			style: 'height: 100%; box-sizing: border-box; overflow: auto; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px 0px;'
		});

		// item-list
		const navItemList = this.createElement({
			type: 'nav',
			classes: ['bm-item-list'],
			style: 'height: 100%;'
		});

		// cross-button
		const div = this.createElement({
			type: 'div'
		});

		const divCrossButton = this.createElement({
			type: 'div',
			classes: ['bm-cross-button'],
			style: 'position: absolute; width: 24px; height: 24px; right: 8px; top: 8px;'
		});

		this.appendChild(divMenuWrap, divMenu, navItemList);

		this._element = divMenuWrap;
		return this._element;
	}
}

export { MenuBox };
