export class ErrorService {
    reportError(e: unknown) {
        console.error(e)
    }

    static make() {
        return new ErrorService();
    }

    static instance() {
        return errorService;
    }
}

const errorService = ErrorService.make();