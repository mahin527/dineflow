import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { User } from "../models/user.model"

// Signup
const signup = asyncHandler(async (req, res) => {

    // get user details from frontend
    const { username, fullname, email, password, contact } = req.body


    // validation - not empty
    if ([username, fullname, email, password, contact].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    // check if user already exists: username, email

    const existedUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if (existedUser) {
        throw new ApiError(409, "User with email already exists!")
        // The 409 Conflict status code indicates that the request could not be completed due to a conflict with the current state of the target resource.  This is a client error (409) meaning the request is syntactically correct and understood by the server, but the server cannot process it because it would create a contradiction with the resource's existing condition, such as concurrent updates, duplicate unique identifiers, or version mismatches.
    }

    //  create user object

    const user = await User.create(
        {
            username,
            fullname,
            email,
            password,
            contact
        }
    )

    // check if user created successfully 
    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user!")
    }

    // TODO: generete token, cookie etc. 


    // Return response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully!")
    )
})

const signin = asyncHandler(async (req, res,) => {
    // get username or email
    // const {username ||  email, password} = req.body

    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    // find the user 
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist!")
    }

    // if user exists then password check

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials!")
    }

    user.lastLogin = new Date()

    await user.save()

    // TODO: generete token, cookie etc. 

    // return response
    return res.status(200).json(
        new ApiResponse(200, user, "User signin successfully!")
    )

})

export { signup, signin }











// Signin