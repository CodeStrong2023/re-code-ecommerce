import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/auth/SingUp';
import NatVar from './components/natvar/Natvar';
import AdminView from './components/admin/AdminView'
import ProductsList from './components/product/ProductsList'
import ProductView from './components/product/ProductView';
import { ProductFilterProvider } from './components/product/ProductFilterContext';



function App() {
  return (
    <Router>
      <div className="App">
        <ProductFilterProvider>
          <NatVar />
          <Routes>
            <Route path="/home" element={<ProductsList />} />
            <Route path="/item/:id" element={<ProductView />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
        </ProductFilterProvider>
      </div>
    </Router>

  );
}

export default App;