class ColorTool {

	constructor(room) {
		this.room = room;

		this.parent = null;

		this.colors = [
			"#EC3455",
			"#F5AD46",
			"#60E8C6",
			"#57B2FC",
			"#005BF6",
			"#9E51B6",
			"#68AB5D",
			"#1D2129",
		];
	}

	hexToRgb(hex) {
		const rgb = [];
		hex = hex.substr(1);
		if (hex.length === 3) {
			hex = hex.replace(/(.)/g, "$1$1");
		}
		hex.replace(/../g, (color) => {
			rgb.push(parseInt(color, 0x10));
		});
		return rgb;
	}

	selectColor(newColor) {
		this.room.setMemberState({ strokeColor: newColor });

		const divCellMidColors = this.parent.children;
		const hex = this.rgbToHex(newColor);

		// border
		divCellMidColors.forEach((mid, i) => {
			mid.style.borderColor = '#FFFFFF';
		});

		// find current
		const index = this.colors.indexOf(hex.toUpperCase());
		divCellMidColors[index].style.borderColor = hex;
	}

	isMatchColor(color) {
		const strokeColor = this.room.state.memberState.strokeColor;
		return (
			strokeColor[0] === color[0] &&
			strokeColor[1] === color[1] &&
			strokeColor[2] === color[2]
		);
	}

	componentToHex(c) {
		const hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	rgbToHex(rgb) {
		return "#" +  this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
	}

	render() {
		const strokeColor = this.room.state.memberState.strokeColor;

		// parent
		const divCellBox = document.createElement('div');
		divCellBox.classList.add('cell-box');

		this.colors.forEach((color, i) => {
			const newColor = this.hexToRgb(color);

			const divCellMidColor = document.createElement('div');
			divCellMidColor.classList.add('cell-mid-color');
			divCellMidColor.style.borderColor = this.isMatchColor(newColor) ? this.rgbToHex(strokeColor) : '#FFFFFF';

			const divCellColor = document.createElement('div');
			divCellColor.classList.add('cell-color');
			divCellColor.style.backgroundColor = color;

			divCellMidColor.appendChild(divCellColor);
			divCellBox.appendChild(divCellMidColor);

			divCellColor.addEventListener('click', event => {
				this.selectColor(newColor);
			}, false);
		});

		this.parent = divCellBox;
		return divCellBox;
	}
}

export { ColorTool }