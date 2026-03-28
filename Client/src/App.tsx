import Signin from "./auth/Signin"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Signup from "./auth/Signup"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import VerifyEmail from "./auth/VerifyEmail"
import HeroSection from "./components/HeroSection"
import Profile from "./components/Profile"
import SearchPage from "./components/SearchPage"
import RestaurantDetails from "./components/RestaurantDetails"
import Cart from "./components/Cart"
import AddRestaurant from "./admin/AddRestaurant"
import AddMenu from "./admin/AddMenu"
import AddOrders from "./admin/AddOrders"
import Success from "./components/Success"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/orders/status",
        element: <Success />
      },
      {
        path: "/search/:srcText",
        element: <SearchPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/admin/restaurant",
        element: <AddRestaurant />
      },
      {
        path: "/admin/menu",
        element: <AddMenu />
      },
      {
        path: "/admin/orders",
        element: <AddOrders />
      }
    ]
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
