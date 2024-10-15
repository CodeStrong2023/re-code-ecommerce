import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoguinForm';
import NatVar from './components/Natvar';
import ProductForm from './components/CrearProducForm'
import ProductsList from './components/ProductsList'
import ProductView from './components/ProductView'; // Asegúrate de importar el componente de vista del producto



function App() {
  return (
    <Router>
    <div className="App">
      <NatVar />
      <RegisterForm />
      <LoginForm />
      <ProductForm />
      <ProductsList/>
  
      <Routes>
      <Route path="/product/:id" element={<ProductView />} /> {}
      </Routes>
    </div>
    </Router>

  );
}

export default App;