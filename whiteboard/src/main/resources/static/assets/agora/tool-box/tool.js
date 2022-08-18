import { icons } from '../config.js';
import DomCreator from '../utils/DomCreator.js';
import { ColorTool } from './colorTool.js';
import { Popover } from '../utils/antd.js';

class ToolBox extends DomCreator {

	constructor(props) {
		super(props);

		this.state = {
			strokeEnable: false,
			isClearActive: false
		};

		this.buttons = [{
			applianceName: 'clicker',
			icon: icons.button.clicker,
			iconActive: icons.button.clearActive
		},
		{
			applianceName: 'selector',
			icon: icons.button.selector,
			iconActive: icons.button.selectorActive
		},
		{
			applianceName: 'pencil',
			icon: icons.button.pencil,
			iconActive: icons.button.pencilActive
		},
		{
			applianceName: 'text',
			icon: icons.button.text,
			iconActive: icons.button.textActive
		},
		{
			applianceName: 'eraser',
			icon: icons.button.eraser,
			iconActive: icons.button.eraserActive
		},
		{
			applianceName: 'arrow',
			icon: icons.button.arrow,
			iconActive: icons.button.arrowActive
		},
		{
			applianceName: 'laserPointer',
			icon: icons.button.laserPointer,
			iconActive: icons.button.laserPointerActive
		},
		{
			applianceName: 'hand',
			icon: icons.button.hand,
			iconActive: icons.button.handActive
		},
		{
			applianceName: 'upload',
			icon: icons.button.upload,
			iconActive: icons.button.uploadActive
		}];

		this.colorCell = {
			applianceName: 'subscript',
			icon: icons.button.subscript,
			iconActive: icons.button.subscriptActive
		};

		this.cleanCell = {
			applianeName: 'clear',
			icon: icons.button.clear,
			iconActive: icons.button.clearActive
		};
	}

	clickAppliance(applianceName) {
		const { room } = this.props;

		room.setMemberState({
			currentApplianceName: applianceName
		});
	}

	componentToHex(number) {
		const hex = number.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	rgbToHex(rgb) {
		return "#" + this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
	}

	onRoomStateChanged(modifyState) {
	}

	renderColorContext() {
		const { room } = this.props;
		const divPalletBox = this.createElement({
			type: 'div',
			classes: ['palette-box']
		});

		const colorTool = new ColorTool({
			room: room
		});

		this.appendChild(divPalletBox, colorTool.render());
		return divPalletBox;
	}

	renderColorCell() {
		const applianceName = this.colorCell.applianceName;
		const icon = this.colorCell.icon;
		const strokeColor = this.props.room.state.memberState.strokeColor;

		// color cell
		const divToolBox = this.createElement({
			type: 'div',
			classes: ['tool-box-cell-box-left']
		});

		const divToolCell = this.createElement({
			type: 'div',
			classes: ['tool-box-cell']
		});

		const divToolCellColor = this.createElement({
			type: 'div',
			classes: ['tool-box-cell-color'],
			style: 'background-color : ' + this.rgbToHex(strokeColor)
		});

		const img = this.createElement({
			type: 'img',
			classes: ['tool-box-cell-subscript', icon],
			style: 'width : 6px'
		});

		this.append(divToolCell, [divToolCellColor, img]);
		this.appendChild(divToolBox, divToolCell);

		// event bubble
		const divPalletBox = this.renderColorContext();
		divPalletBox.addEventListener('click', event => {
			divToolCellColor.style.backgroundColor = event.target.style.backgroundColor;
		}, false);

		// pallet
		const popover = new Popover({
			target: img,
			content: divPalletBox,
			placement: 'right'
		});
		const colorPopover = popover.render();
		document.body.appendChild(colorPopover);

		return divToolBox;
	}

	renderCleanCell() {
		const { room } = this.props;
		const applianceName = this.cleanCell.applianceName;
		const isClearActivce = this.state.isClearActive;
		const icon = isClearActivce ? this.cleanCell.iconActive : this.cleanCell.icon;

		const divToolBox = this.createElement({
			type: 'div',
			classes: ['tool-box-cell-box-left']
		});

		divToolBox.addEventListener('mouseEnter', event => {
			this.state.isClearActive = true;
		}, false);

		divToolBox.addEventListener('mouseLeave', event => {
			this.state.isClearActive = false;
		}, false);

		divToolBox.addEventListener('click', event => {
			room.cleanCurrentScene();
		}, false);

		const divToolCell = this.createElement({
			type: 'div',
			classes: ['tool-box-cell']
		});

		const img = this.createElement({
			type: 'img',
			classes: [icon]
		});

		this.appendChild(divToolBox, divToolCell, img);

		return divToolBox;
	}

	renderButton(component) {
		const roomState = this.props.room.state;
		const currentApplianceName = roomState.memberState.currentApplianceName;
		const applianceName = component.applianceName;
		const isSelected = currentApplianceName === applianceName;
		const icon = isSelected ? component.iconActive : component.icon;

		const divToolBox = this.createElement({
			type: 'div',
			classes: ['tool-box-cell-box-left']
		});

		divToolBox.addEventListener('click', event => {
			this.clickAppliance(applianceName);
		}, false);

		const divToolCell = this.createElement({
			type: 'div',
			classes: ['tool-box-cell']
		});

		const img = this.createElement({
			type: 'img',
			classes: [icon]
		});

		this.appendChild(divToolBox, divToolCell, img);

		return divToolBox;
	}

	render() {
		const toolMid = this.createElement({
			type: 'div',
			classes: ['tool-mid-box-left']
		});

		this.buttons.forEach((component, i) => {
			const current = this.renderButton(component);
			this.appendChild(toolMid, current);

			current.addEventListener('click', event => {
				const imgs = toolMid.querySelectorAll('img');

				this.buttons.forEach((c, j) => {
					this.clearClasses(imgs[j]);
					this.addClasses(imgs[j], [(i === j) ? c.iconActive : c.icon]);
				});
			}, false);
		});

		this.append(toolMid, [this.renderColorCell(), this.renderCleanCell()]);

		this._element = toolMid;
		room.callbacks.on("onRoomStateChanged", this.onRoomStateChanged);

		return this._element;
	}
}

export { ToolBox };