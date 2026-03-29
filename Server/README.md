# 🍽️ DineFlow (Restaurant Management System)

A full-stack MERN-based restaurant management system built with best practices, clean architecture, and scalable design.

---
### Backend

* [Node.js](https://nodejs.org/docs/latest/api/)
* [Express.js](https://expressjs.com/en/starter/installing.html)
* []()

### Database

* MongoDB (Mongoose)

### Authentication

* JWT (JSON Web Token)
* bcrypt


### Flow Summary

Controller will write only business logic → throw new ApiError(...) if error.

asyncHandler will send error to middleware without try/catch.

errorHandler middleware will convert all errors to consistent JSON format.

ApiResponse will send success response in consistent format.

