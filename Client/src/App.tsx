import Signin from "./auth/Signin"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./components/MainLayout"
import Signup from "./auth/Signup"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import VerifyEmail from "./auth/VerifyEmail"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />
  },
  {
    path: "/login",
    element: <Signin />
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
      {
    path: "/verify-email",
    element: <VerifyEmail />
  },
])

function App() {

  return (
    <div>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </div>
  )
}

export default App
