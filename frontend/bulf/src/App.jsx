import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/auth/SingUp';
import NatVar from './components/natvar/Natvar';
import AdminView from './components/admin/AdminView';
import ProductsList from './components/product/ProductsList';
import ProductView from './components/product/ProductView';
import { ProductFilterProvider } from './components/product/ProductFilterContext';
import './App.css';
import { UserProvider } from './components/user/UserContext';
import ProtectedRoute from './components/user/ProtectedRoute';
import { CartProvider } from './components/user/CartContext';

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <CartProvider>
            <ProductFilterProvider>
              <NatVar />
              <Routes>
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
              </Routes>
            </ProductFilterProvider>
          </CartProvider>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
