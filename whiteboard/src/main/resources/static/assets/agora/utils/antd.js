class Popover {
	constructor(props) {
		this.props = props;
		this.parent = null;
	}

	calculatePosition() {
		const target = this.props.target;
		const clientRect = target.getBoundingClientRect();

		this.parent.style.left = (clientRect.left + target.clientWidth + 5) + 'px';
		this.parent.style.top = (clientRect.top + scrollY - (this.parent.clientHeight / 2)) + 'px';
	}

	toggle() {
		const target = this.props.target;

		// show, hide
		const isActive = target.dataset.toggle;

		if (isActive === 'true') {
			target.dataset.toggle = 'false';
			this.parent.classList.add('ant-popover-hidden');
			this.parent.style.pointerEvents = 'none';
		} else {
			target.dataset.toggle = 'true';
			this.parent.classList.remove('ant-popover-hidden');
			this.parent.style.pointerEvents = 'auto';
		}

		// calculate position
		this.calculatePosition();
	}

	render() {
		const divPopover = document.createElement('div');
		divPopover.classList.add('ant-popover');
		divPopover.classList.add('ant-popover-placement-' + this.props.placement);
		divPopover.classList.add('ant-popover-hidden');
		divPopover.style.position = 'absolute';
		divPopover.style.pointerEvents = 'none';

		const divPopoverContent = document.createElement('div');
		divPopoverContent.classList.add('ant-popover-content');

		// arrow
		const divPopoverArrow = document.createElement('div');
		divPopoverArrow.classList.add('ant-popover-arrow');

		const spContent = document.createElement('span');
		spContent.classList.add('ant-popover-arrow-content');

		divPopoverArrow.appendChild(spContent);
		divPopoverContent.appendChild(divPopoverArrow);

		// inner
		const divPopoverInner = document.createElement('div');
		divPopoverInner.classList.add('ant-popover-inner');

		const divPopoverInnerContent = document.createElement('div');
		divPopoverInnerContent.classList.add('ant-popover-inner-content');

		divPopoverInnerContent.appendChild(this.props.content);
		divPopoverInner.appendChild(divPopoverInnerContent);
		divPopoverContent.appendChild(divPopoverInner);

		divPopover.appendChild(divPopoverContent);
		this.parent = divPopover;

		// event
		this.props.target.addEventListener('click', event => {
			this.toggle();
		}, false);

		return this.parent;
	}
}

export { Popover };