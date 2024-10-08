import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoguinForm';
import NatVar from './components/Natvar';
import ProductForm from './components/CrearProducForm'


function App() {
  return (
    <div className="App">
      <NatVar />
      <RegisterForm />
      <LoginForm />
      <ProductForm />
    
    </div>
  );
}

export default App;