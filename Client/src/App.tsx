import Signin from "./auth/Signin"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./components/MainLayout"
import Signup from "./auth/Signup"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
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
