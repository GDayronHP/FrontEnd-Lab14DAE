import axios from 'axios'; 

const Gerente_BASE_REST_API_URL = "http://127.0.0.1:8000/api/auth/audit-logs/";

class GerenteService {
    getAuditoria() {
        return axios.get(Gerente_BASE_REST_API_URL);
    }
}

export default new GerenteService
