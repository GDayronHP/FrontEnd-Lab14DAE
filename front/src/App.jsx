import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Gerente from "./pages/gerente";
import Contador from "./pages/contador";
import Dashboard from "./pages/Dashboard";
import FacturaForm from "./pages/FacturaForm";
import FacturaList from "./pages/FacturaList";
import MainLayout from "./layouts/mainLayout";

const contadorItems = [
  { name: "Contador", path: "/" },
  { name: "Formulario de Factura", path: "/factura-form" },
  { name: "Lista de facturas", path: "/factura-list" },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout title="Inicio de Sesión">
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/gerente"
          element={
            <MainLayout title="Gerente">
              <Gerente />
            </MainLayout>
          }
        />
        <Route
          path="/contador"
          element={
            <MainLayout title="Contador" items={contadorItems}>
              <Contador />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MainLayout title="Dashboard">
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/factura-form"
          element={
            <MainLayout title="Formulario de factura" items={contadorItems}>
              <FacturaForm />
            </MainLayout>
          }
        />
        <Route
          path="/factura-list"
          element={
            <MainLayout title="Lista de facturas" items={contadorItems}>
              <FacturaList />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
