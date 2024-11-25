import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Gerente from "./pages/gerente";
import Contador from "./pages/contador";
import Dashboard from "./pages/Dashboard";
import FacturaForm from "./pages/FacturaForm";
import FacturaList from "./pages/FacturaList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gerente" element={<Gerente />} />
        <Route path="/contador" element={<Contador />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/factura-form" element={<FacturaForm />} />
        <Route path="/factura-list" element={<FacturaList />} />
      </Routes>
    </Router>
  );
}

export default App;
