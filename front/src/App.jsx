import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Gerente from "./pages/gerente";
import Contador from "./pages/contador";
import Dashboard from "./pages/Dashboard";
import FacturaForm from "./pages/FacturaForm";
import FacturaList from "./pages/FacturaList";
import MainLayout from "./layouts/mainLayout";
import Profile from "./pages/Profile";
import ChatPage from "./pages/ChatPage";
import FacturaProveedorForm from "./pages/facturaProveedor";
import Prueba from "./pages/prueba";

const contadorItems = [
  { name: "Inicio", path: "/contador" },
  { name: "Formulario de Factura", path: "/factura-form" },
  { name: "Lista de facturas", path: "/factura-list" },
  { name: "Edición de perfil", path: "/edit-profile" },
  { name: "Chat", path: "/chat" },
  { name: "Factura del proveedor", path: "/factura-proveedor" },
  { name: "Prueba", path: "/prueba" },
];
const adminItmens = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Admin", path: "/dashboard" },
  { name: "Deudas", path: "/dashboard" },
  { name: "Resultado", path: "/dashboard" },
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
            <MainLayout title="Dashboard" items={adminItmens}>
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
        <Route
          path="/edit-profile"
          element={
            <MainLayout title="edición de perfil" items={contadorItems}>
              <Profile />
            </MainLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <MainLayout title="Chat" items={contadorItems}>
              <ChatPage />
            </MainLayout>
          }
        />

        <Route
          path="/factura-proveedor"
          element={
            <MainLayout title="Factura del proveedor" items={contadorItems}>
              <FacturaProveedorForm />
            </MainLayout>
          }
        />

        <Route
          path="/prueba"
          element={
            <MainLayout title="Pruebas" items={contadorItems}>
              <Prueba />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
