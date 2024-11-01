import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import RegisterForm from "./components/auth/SingUp";
import NatVar from "./components/natvar/Natvar";
import AdminView from "./components/admin/AdminView";
import ProductsList from "./components/product/ProductsList";
import ProductView from "./components/product/ProductView";
import { ProductFilterProvider } from "./components/product/ProductFilterContext";
import "./App.css";
import { UserProvider } from "./components/user/UserContext";
import ProtectedRoute from "./components/user/ProtectedRoute";
import { CartProvider } from "./components/user/CartContext";
import AdminPurchaseTable from "./components/admin/AdminPurchaseTable";
import Modal from "react-modal";
import SuccessPurchase from "./components/purchaseresult/SuccessPurchase";
import FailedPurchase from "./components/purchaseresult/FailedPurchase";

Modal.setAppElement("#root");

function AppContent() {
  const location = useLocation();
  const showNatVar = !["/success-purchase", "/failed-purchase"].includes(
    location.pathname
  );

  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          <ProductFilterProvider>
            {showNatVar && <NatVar />}
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<ProductsList />} />
              <Route path="/item/:id" element={<ProductView />} />
              <Route path="/signup" element={<RegisterForm />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/purchase-orders"
                element={
                  <ProtectedRoute>
                    <AdminPurchaseTable />
                  </ProtectedRoute>
                }
              />
              <Route path="/success-purchase" element={<SuccessPurchase />} />
              <Route path="/failed-purchase" element={<FailedPurchase />} />
            </Routes>
          </ProductFilterProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
