import {Navigate, Route, Routes} from "react-router-dom";
import './App.css'
import Signup from "./pages/auth/Signup.jsx";
import {Toaster} from "react-hot-toast";
import Login from "./pages/auth/Login.jsx";
import ManageStores from "@/pages/admin/ManageStores.jsx";
import ManageUsers from "@/pages/admin/ManageUsers.jsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.jsx";
import StoreList from "@/pages/user/StoreList.jsx";
import Navbar from "@/components/common/Navbar.jsx";
import ResetPassword from "@/components/common/ResetPassword.jsx";
import OwnerDashboard from "@/pages/owner/OwnerDashboard.jsx";
import ProtectedRoute from "@/pages/auth/ProtectedRoute.jsx";
import AllRatings from "@/pages/admin/AllRatings.jsx";

function App() {

  return (
      <>
          <div><Toaster/></div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route
                  path="/stores"
                  element={
                      <ProtectedRoute role="user">
                          <StoreList />
                      </ProtectedRoute>
                  }
              />

              <Route
                  path="/owner/store"
                  element={
                      <ProtectedRoute role="store_owner">
                          <OwnerDashboard />
                      </ProtectedRoute>
                  }
              />

              <Route
                  path="/admin"
                  element={
                      <ProtectedRoute role="admin">
                          <AdminDashboard />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/admin/users"
                  element={
                      <ProtectedRoute role="admin">
                          <ManageUsers />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/admin/stores"
                  element={
                      <ProtectedRoute role="admin">
                          <ManageStores />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path="/admin/ratings"
                  element={
                      <ProtectedRoute role="admin">
                          <AllRatings />
                      </ProtectedRoute>
                  }
              />
          </Routes>
      </>
  )
}

export default App
