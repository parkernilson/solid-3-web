interface VisualViewportInfo {
    height: number;
    width: number;
}

export class VisualViewportInspector {
    private _viewport = $state<VisualViewportInfo>()
    get viewport() {
        if (!this._viewport) {
            throw new Error('VisualViewport was accessed before it was initialized.');
        }
        return this._viewport;
    }
    private set viewport(value: VisualViewportInfo) {
        this._viewport = value;
    }

    constructor(window: Window) {
        if (!window.visualViewport) {
            throw new Error('VisualViewport was not found on the window object.');
        }
        this.viewport = {
            height: window.visualViewport.height,
            width: window.visualViewport.width
        }
        window.visualViewport.addEventListener('resize', (e) => {
            const v = e.target as VisualViewport;
            this.viewport = {
                height: v.height,
                width: v.width
            }
        })
    }
}