import axios from "axios";

const CLIENTE_BASE_REST_API_URL = "http://127.0.0.1:8000/api/auth";

class LoginService {
  verifyLogin(email, password) {
    return axios.post(CLIENTE_BASE_REST_API_URL + "/login/", {
      email,
      contraseña: password,
    });
  }
}

export default new LoginService();
