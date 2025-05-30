// LIBRERIAS
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// CSS
import "./Style.css";

// COMPONENTS
import Navbar from "./Navbar/components/Navbar/Navbar";
import ProductoList from "./Productos/ProductoList/ProductoList";
import Carrito from "./Carrito/components/Carrito/Carrito";
import Login from "./components/Login";
import Register from "./components/Register";

// PAGES
import Home from "./pages/Home";
import ProductoDetalle from "./pages/ProductoDetalle";
import SobreNosotros from "./pages/SobreNosotros";

// CONTEXT
import { CarritoProvider } from "./Carrito/context/CarritoContext";
import { CrearProductos } from "./pages/productos/CrearProductos";

// Un componente para envolver las rutas y ocultar el Navbar en login/registro
function LayoutWithNavbar() {
  const location = useLocation();
  const ocultarNavbar =
    location.pathname === "/login" || location.pathname === "/registro";

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
        <Route path="/crear-producto" element={<CrearProductos />} />
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
