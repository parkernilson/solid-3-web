export interface VisualViewportInfo {
	height: number;
	width: number;
}

export class VisualViewportInspector {
	private _viewport = $state<VisualViewportInfo>()!;
	get viewport() {
		return this._viewport!;
	}
	private set viewport(value: VisualViewportInfo) {
		this._viewport = value;
	}

	listen(e: Event) {
		const v = e.target as VisualViewport;
		this.viewport = { height: v.height, width: v.width };
	}

	boundListener: EventListener;

	constructor() {
		this.boundListener = this.listen.bind(this);
	}

	setupListener(window: Window) {
		if (!window.visualViewport) {
			throw new Error('VisualViewport was not found on the window object.');
		}
		this.viewport = { height: window.visualViewport.height, width: window.visualViewport.width };
		// Must use bound listener so that we are always using the same reference to the listener
		// so that we can remove it, ensuring we only ever have one, even if the load function runs
		// many times.
		window.visualViewport.removeEventListener('resize', this.boundListener);
		window.visualViewport.addEventListener('resize', this.boundListener);
	}
}
