import axios from "axios";

const CLIENTE_BASE_REST_API_URL = "http://127.0.0.1:8000/api/auth";

class GerenteService {
  getFacturas() {
    return axios.get(CLIENTE_BASE_REST_API_URL + "/facturas-clientes/");
  }

  setFactura(factura, token) {
    return axios.post(
      "http://127.0.0.1:8000/api/auth/facturas-clientes/",
      factura,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getClientes(token) {
    return axios.get(CLIENTE_BASE_REST_API_URL + "/clientes/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserLogued(token) {
    return axios.get("http://127.0.0.1:8000/api/auth/usuario-logueado/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new GerenteService();
