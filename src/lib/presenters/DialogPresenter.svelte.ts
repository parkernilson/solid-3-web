import { ErrorHandler } from "../utils/ErrorHandler";

export interface DialogResponse {
    action: 'accept' | 'cancel';
}

export interface Dialog {
    content: {
        title?: string;
        body: string;
    }
    actions: {
        accept: {
            label: string;
            handle: () => Promise<DialogResponse> | DialogResponse;
        },
        cancel?: {
            label: string;
            handle: () => Promise<DialogResponse> | DialogResponse;
        }
    }
}

export class DialogPresenter extends ErrorHandler {
    private _isOpen = $state(false);
    private _dialog: Dialog | undefined = $state();
    private _resolve: (value: DialogResponse) => void = () => {};
    private _reject: (reason?: unknown) => void = () => {};

    get isOpen() {
        return this._isOpen;
    }
    private set isOpen(value: boolean) {
        this._isOpen = value;
    }

    get dialog() {
        return this._dialog;
    }
    private set dialog(value: Dialog | undefined) {
        this._dialog = value;
    }

    private get resolve() {
        return this._resolve;
    }
    private set resolve(value: (value: DialogResponse) => void) {
        this._resolve = value;
    }

    private get reject() {
        return this._reject;
    }
    private set reject(value: (reason?: unknown) => void) {
        this._reject = value;
    }

    showDialog(dialog: Dialog): Promise<DialogResponse> {
        this.dialog = dialog;
        this.isOpen = true;
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    } 

    handleDialogAction(action: () => Promise<DialogResponse> | DialogResponse) {
        this.doErrorable({
            action: async () => {
                const response = await action();
                this.resolveDialog(response);
            }
        })
    }

    resolveDialog(response: DialogResponse) {
        this.resolve(response);
        this.closeDialog();
    }

    closeDialog() {
        this.isOpen = false;
        this.resolve = () => {};
        this.reject = () => {};
    }
}