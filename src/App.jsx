import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/authSlice";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Products from "./components/Products";
import Profile from "./components/Profile";
import { getDashboardStats } from "./store/slices/adminSlice";
import { fetchAllProducts } from "./store/slices/productSlice";

function App() {
  const { openedComponent } = useSelector((state) => state.extra);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if(isAuthenticated){
      dispatch(getDashboardStats())
      dispatch(fetchAllProducts())
    }
  }, [isAuthenticated])

  const renderDashboardContent = () => {
    switch (openedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      case "Products":
        return <Products />;
      case "Profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password/forgot" element={<ForgotPasswordPage />} />
        <Route path="/password/reset/:token" element={<ResetPasswordPage />} />
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="flex min-h-screen">
                <Sidebar />
                {renderDashboardContent()}
              </div>
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
