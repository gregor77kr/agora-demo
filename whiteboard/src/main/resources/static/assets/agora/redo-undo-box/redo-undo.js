class RedoUndo {
	constructor(room) {
		this.room = room;

		this.parent = null;

		this.state = {
			undoSteps: 0,
			redoSteps: 0
		};

		this.undo = {
			icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT5yZWRvPC90aXRsZT4NCiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+DQogICAgICAgIDxnIGlkPSLliIflm74iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04OC4wMDAwMDAsIC04MC4wMDAwMDApIiBzdHJva2U9IiM0NDRFNjAiPg0KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSLot6/lvoQtMTHlpIfku70tNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTcuMDAwMDAwLCA5MC4wMDAwMDApIHJvdGF0ZSgtMzYwLjAwMDAwMCkgdHJhbnNsYXRlKC05Ny4wMDAwMDAsIC05MC4wMDAwMDApICIgcG9pbnRzPSI5OSA5NCA5NyA5MiA5NSA5MCA5NyA4OCA5OSA4NiI+PC9wb2x5bGluZT4NCiAgICAgICAgICAgIDxwYXRoIGQ9Ik05NSw5MCBMMTAzLDkwIEMxMDQuMTA0NTY5LDkwIDEwNSw5MC44OTU0MzA1IDEwNSw5MiBMMTA1LDk4IEwxMDUsOTgiIGlkPSLot6/lvoQtNyI+PC9wYXRoPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+',
			iconDisabled: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT5yZWRvLWQ8L3RpdGxlPg0KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4NCiAgICAgICAgPGcgaWQ9IuWIh+WbviIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOC4wMDAwMDAsIC04MC4wMDAwMDApIiBzdHJva2U9IiNEQkUxRUEiPg0KICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSLot6/lvoQtMTHlpIfku70tNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM3LjAwMDAwMCwgOTAuMDAwMDAwKSByb3RhdGUoLTM2MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTM3LjAwMDAwMCwgLTkwLjAwMDAwMCkgIiBwb2ludHM9IjEzOSA5NCAxMzcgOTIgMTM1IDkwIDEzNyA4OCAxMzkgODYiPjwvcG9seWxpbmU+DQogICAgICAgICAgICA8cGF0aCBkPSJNMTM1LDkwIEwxNDMsOTAgQzE0NC4xMDQ1NjksOTAgMTQ1LDkwLjg5NTQzMDUgMTQ1LDkyIEwxNDUsOTggTDE0NSw5OCIgaWQ9Iui3r+W+hC03Ij48L3BhdGg+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4='
		};

		this.redo = {
			icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT51bmRvPC90aXRsZT4NCiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+DQogICAgICAgIDxnIGlkPSLliIflm74iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04OC4wMDAwMDAsIC0xMTYuMDAwMDAwKSIgc3Ryb2tlPSIjNDQ0RTYwIj4NCiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0i6Lev5b6ELTEx5aSH5Lu9LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMy4wMDAwMDAsIDEyNi4wMDAwMDApIHNjYWxlKC0xLCAxKSByb3RhdGUoLTM2MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTAzLjAwMDAwMCwgLTEyNi4wMDAwMDApICIgcG9pbnRzPSIxMDUgMTMwIDEwMyAxMjggMTAxIDEyNiAxMDMgMTI0IDEwNSAxMjIiPjwvcG9seWxpbmU+DQogICAgICAgICAgICA8cGF0aCBkPSJNOTUsMTI2IEwxMDMsMTI2IEMxMDQuMTA0NTY5LDEyNiAxMDUsMTI2Ljg5NTQzMSAxMDUsMTI4IEwxMDUsMTM0IEwxMDUsMTM0IiBpZD0i6Lev5b6ELTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMC4wMDAwMDAsIDEzMC4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTEwMC4wMDAwMDAsIC0xMzAuMDAwMDAwKSAiPjwvcGF0aD4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==',
			iconDisabled: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT51bmRvLWQ8L3RpdGxlPg0KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4NCiAgICAgICAgPGcgaWQ9IuWIh+WbviIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOC4wMDAwMDAsIC0xMTYuMDAwMDAwKSIgc3Ryb2tlPSIjREJFMUVBIj4NCiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0i6Lev5b6ELTEx5aSH5Lu9LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0My4wMDAwMDAsIDEyNi4wMDAwMDApIHNjYWxlKC0xLCAxKSByb3RhdGUoLTM2MC4wMDAwMDApIHRyYW5zbGF0ZSgtMTQzLjAwMDAwMCwgLTEyNi4wMDAwMDApICIgcG9pbnRzPSIxNDUgMTMwIDE0MyAxMjggMTQxIDEyNiAxNDMgMTI0IDE0NSAxMjIiPjwvcG9seWxpbmU+DQogICAgICAgICAgICA8cGF0aCBkPSJNMTM1LDEyNiBMMTQzLDEyNiBDMTQ0LjEwNDU2OSwxMjYgMTQ1LDEyNi44OTU0MzEgMTQ1LDEyOCBMMTQ1LDEzNCBMMTQ1LDEzNCIgaWQ9Iui3r+W+hC03IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDAuMDAwMDAwLCAxMzAuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xNDAuMDAwMDAwLCAtMTMwLjAwMDAwMCkgIj48L3BhdGg+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4='
		};
	}

	componentDidMount() {
		if (this.room.isWritable) {
			this.room.disableSerialization = false;
		}
		this.room.callbacks.on("onCanUndoStepsUpdate", (steps) => {
			this.setUndoSteps(steps);

			const imgUndo = this.parent.querySelectorAll('img')[0];
			imgUndo.src = this.state.undoSteps === 0 ? this.undo.iconDisabled : this.undo.icon;
		});

		this.room.callbacks.on("onCanRedoStepsUpdate", (steps) => {
			this.setRedoSteps(steps);

			const imgRedo = this.parent.querySelectorAll('img')[1];
			imgRedo.src = this.state.redoSteps === 0 ? this.redo.iconDisabled : this.redo.icon;
		});
	}

	componentWillUnmount() {
		this.room.callbacks.off("onCanUndoStepsUpdate", this.setUndoSteps);
		this.room.callbacks.off("onCanRedoStepsUpdate", this.setRedoSteps);
	}

	setUndoSteps(steps) {
		this.state.undoSteps = steps;
	}

	setRedoSteps(steps) {
		this.state.redoSteps = steps;
	}

	handleUndo() {
		this.room.undo();
	}

	handleRedo() {
		this.room.redo();
	}

	render() {
		const divRedoUndo = document.createElement('div');
		divRedoUndo.classList.add('redo-undo');

		// undo
		const divUndo = document.createElement('div');
		divUndo.classList.add('redo-undo-controller-btn');

		const imgUndo = document.createElement('img');
		imgUndo.src = this.state.undoSteps === 0 ? this.undo.iconDisabled : this.undo.icon;

		divUndo.appendChild(imgUndo);
		divRedoUndo.appendChild(divUndo);

		divUndo.addEventListener('click', event => {
			this.handleUndo();
		}, false);

		// redo
		const divRedo = document.createElement('div');
		divRedo.classList.add('redo-undo-controller-btn');

		const imgRedo = document.createElement('img');
		imgRedo.src = this.state.redoSteps === 0 ? this.redo.iconDisabled : this.redo.icon;

		divRedo.appendChild(imgRedo);
		divRedoUndo.appendChild(divRedo);

		divRedo.addEventListener('click', event => {
			this.handleRedo();
		}, false);

		this.componentDidMount();
		this.parent = divRedoUndo;
		
		return this.parent;
	}
}

export { RedoUndo };