class ApiResponse<T = unknown> {

    public statusCode: number;      // HTTP status code (e.g. 200, 201 etc.)
    public data: T | null;          // payload, generic type for flexibility
    public message: string;        // success messages
    public success: boolean;        // true if status code < 400

    constructor(
        statusCode: number,
        data: T | null = null,
        message: string = "Success!"
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message
        this.success = statusCode >= 200 && statusCode < 400;
    }
}

export { ApiResponse }


/*
## Example usage

```js
return res.status(201).json(
  new ApiResponse<User>(201, createdUser, "User registered successfully")
);
```
*/

