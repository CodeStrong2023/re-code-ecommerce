import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/SingUp';
import NatVar from './components/Natvar';
import ProductForm from './components/CrearProducForm'
import ProductsList from './components/ProductsList'
import ProductView from './components/ProductView';
import { ProductFilterProvider } from './components/ProductFilterContext';



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
            <Route path="/admin" element={<ProductForm />} />
          </Routes>
        </ProductFilterProvider>
      </div>
    </Router>

  );
}

export default App;