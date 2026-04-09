class ApiError extends Error {

    public statusCode: number;          // HTTP status code (e.g. 400, 500)
    public data: unknown | null;        // optional payload, usually null  
    public success: boolean;            // always false for errors
    public errors: string[];            // list of error messages/details

    constructor(
        statusCode: number,
        message: string = "Something went wrong!",
        errors: string[] = [],
        stack: string = ""
    ) {
        super(message)

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack;
        } if (stack) {
            this.stack = stack;
        } else {
            // `Error` is cast to `any` so that TS does not give an error
            (Error as any).captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError }