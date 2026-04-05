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


// ১. যারা লগইন নেই তাদের জন্য
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isCheckingAuth } = useUserStore();

  if (isCheckingAuth) return <Loading />; // চেক শেষ না হওয়া পর্যন্ত ওয়েট করুন

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

// ২. যারা অলরেডি লগইন আছে (যাতে আবার লগইন পেজে না যেতে পারে)
const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();

  // যদি লগইন থাকে, তবে সাইন-ইন পেজে আসার দরকার নেই, হোমে পাঠিয়ে দাও
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

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
    // element: <MainLayout />,

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
        path: "/search/:searchText",
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
        element: <AdminRoute><AddRestaurant /></AdminRoute>,
        // element: <AddRestaurant />
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>,
        // element: <AddMenu />

      },
      {
        path: "/admin/orders",
        element: <AdminRoute><AddOrders /></AdminRoute>
        // element: <AddOrders />

      }
    ]
  },
  {
    path: "/signin",
    element: <AuthenticatedUser><Signin /></AuthenticatedUser>
    // element: <Signin />

  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>
    // element: <Signup />

  },
  {
    path: "/forgot-password",
    // element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>
    element: <ForgotPassword />

  },
  {
    path: "/reset-password/:token",
    // element: <AuthenticatedUser><ResetPassword /></AuthenticatedUser>
    element: <ResetPassword />
  },
  {
    path: "/verify-email",
    // If you wrap it with AuthenticatedUser, verified users will no longer be able to enter here
    element: <AuthenticatedUser><VerifyEmail /></AuthenticatedUser>
  },

])

function App() {

  const { checkAuthentication, isCheckingAuth } = useUserStore()
  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  if (isCheckingAuth) return <Loading />

  return (
    <div>
      <RouterProvider router={appRouter}>
      </RouterProvider>
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
