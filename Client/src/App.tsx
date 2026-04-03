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
import { Toaster } from "@/components/ui/sonner"
import { Navigate } from "react-router-dom"
import { useUserStore } from "./store/useUserStore"
import { useEffect } from "react"
import Loading from "./components/Loading"


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore()

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children

}

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore()
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children

}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore()

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes> <MainLayout /></ProtectedRoutes>,
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
        element: <AdminRoute><AddRestaurant /></AdminRoute>
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>
      },
      {
        path: "/admin/orders",
        element: <AdminRoute><AddOrders /></AdminRoute>
      }
    ]
  },
  {
    path: "/signin",
    element: <AuthenticatedUser><Signin /></AuthenticatedUser>
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>
  },
{
    path: "/reset-password/:token",
    element: <AuthenticatedUser><ResetPassword /></AuthenticatedUser>
},
  {
    path: "/verify-email",
    element: <AuthenticatedUser><VerifyEmail /></AuthenticatedUser>
  },

])

function App() {

  const { checkAuthentication, isCheckingAuth } = useUserStore()

  useEffect(() => {
    checkAuthentication()
  }, [])

  if (isCheckingAuth) {
    return <Loading />
  }

  return (
    <div>
      <RouterProvider router={appRouter}>
      </RouterProvider>
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
