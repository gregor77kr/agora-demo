export default class DomCreator {

	constructor(props) {
		this.props = props || {};

		this._element = null;
	}

	/**
	 * validator
	 */
	isNull = (value) => {
		return (!value) ? true : false;
	}

	isEmpty = (object) => {
		if (this.isNull(object)) {
			return true;
		}

		if (Array.isArray(object) && object.length === 0) {
			return true;
		}

		if (typeof object === 'object' && Object.keys(object).length === 0) {
			return true;
		}

		return false;
	}

	isObject = (object) => {
		return !this.isEmpty(object) && typeof object === 'object' && !Array.isArray(object)
	}

	isString = (string) => {
		return !this.isNull(string) && typeof string === 'string';
	}

	isElement = (element) => {
		return !this.isNull(element) && element.nodeType === Node.ELEMENT_NODE;
	}

	/**
	 * handle dom
	 */
	appendChild = (...args) => {
		if (args.length <= 1) {
			return;
		}

		const elements = args.slice(0, args.length - 1);

		elements.forEach((element, i) => {
			element.appendChild(args[i + 1]);
		});
	}

	append = (element, childrens) => {
		if (!this.isElement(element)) {
			throw 'element is not a HTMLElement';
		}

		if (!Array.isArray(childrens)) {
			return;
		}

		childrens.forEach(child => {
			element.appendChild(child);
		});
	}

	/**
	 * handle class
	 */
	addClasses = (element, classes) => {
		if (!this.isElement(element)) {
			throw 'element is not a HTMLElement';
		}

		if (!Array.isArray(classes)) {
			return;
		}

		classes.forEach(cls => {
			element.classList.add(cls);
		});
	}

	removeClasses = (element, classes) => {
		if (!this.isElement(element)) {
			throw 'element is not a HTMLElement';
		}

		if (!Array.isArray(classes)) {
			return;
		}

		classes.forEach(cls => {
			element.classList.remove(cls);
		});
	}

	clearClasses = (element) => {
		if (!this.isElement(element)) {
			throw 'element is not a HTMLElement';
		}

		element.className = '';
	}

	/**
	 * handle style
	 */
	toCamelCase = (string) => {
		if (!this.isString(string)) {
			return;
		}

		return string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
	}

	cssText = (element, string) => {
		if (!this.isElement(element)) {
			throw 'element is not a HTMLElement';
		}

		if (!this.isString(string)) {
			return;
		}

		const styles = string.replaceAll(' ', '').split(';');
		styles.forEach(style => {
			const node = style.split(':');
			this.css(element, node[0], node[1]);
		});
	}

	css = (element, property, value) => {
		if (!this.isElement(element)) {
			throw 'element is not a HTMLElement';
		}

		if (!this.isString(property) || !this.isString(value)) {
			return;
		}

		property = this.toCamelCase(property);
		element.style[property] = value;
	}

	/**
	 * type
	 * id
	 * classes
	 * style
	 * event
	 */
	createElement = (attr) => {
		attr = this.isObject(attr) ? attr : {};

		const type = attr.type;
		const id = attr.id;
		const classes = attr.classes;
		const style = attr.style;

		// type is required
		if (!this.isString(type)) {
			throw 'type is not a String';
		}

		const element = document.createElement(type);
		if (this.isString(id)) {
			element.id = id;
		}

		// add class if exists
		this.addClasses(element, classes);

		// add style if exists
		this.cssText(element, style);

		return element;
	}

}
