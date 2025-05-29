import './Style.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductoList from './components/ProductoList'; 
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProductoDetalle from './pages/ProductoDetalle';
import { CarritoProvider } from './context/CarritoContext';
import Carrito from './components/Carrito';
import SobreNosotros from './pages/SobreNosotros';
import { useEffect } from 'react';

// Un componente para envolver las rutas y ocultar el Navbar en login/registro
function LayoutWithNavbar() {
  const location = useLocation();
  const ocultarNavbar = location.pathname === "/login" || location.pathname === "/registro";

  useEffect(() => {
    window.scrollTo(0, 0); // Por si hay scroll acumulado
  }, [location]);

  return (
    <>
      {!ocultarNavbar && <Navbar />}
      <Routes>
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ProductoList />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CarritoProvider>
      <Router>
        <LayoutWithNavbar />
      </Router>
    </CarritoProvider>
  );
}

export default App;
