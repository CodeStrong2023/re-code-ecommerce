import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoguinForm';
import NatVar from './components/Natvar';
import ProductForm from './components/CrearProducForm'
import ProductsList from './components/ProductsList'
import ProductView from './components/ProductView'; // Asegúrate de importar el componente de vista del producto
import { ProductFilterProvider } from './components/ProductFilterContext';



function App() {
  return (
    <Router>
    <div className="App">
    <ProductFilterProvider>
      <NatVar />

      <ProductsList />
      <Routes>
      <Route path="/item/:id" element={<ProductView />} />{}
      </Routes>
      <RegisterForm />
      <LoginForm />
      <ProductForm />  
    </ProductFilterProvider>


    </div>
    </Router>

  );
}

export default App;