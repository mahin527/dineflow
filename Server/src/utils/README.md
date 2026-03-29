### Example usage 

```ts
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import User from '../models/user.model';

export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({ email, password });

  return res.status(201).json(
    new ApiResponse(201, user, "User registered successfully")
  );
});
```

---

### Benefits of this TypeScript version
- **Type safety** → IDE auto-completion, compile-time error detection.
- **Clean controllers** → Only business logic will be there, excluding try/catch.
- **Scalable** → consistent error handling flow in large projects.

---

When writing `asyncHandler.ts` in TypeScript, it should be strongly typed using Express types. This will keep your controller clean, error handling central, and the entire project up to professional standards.

