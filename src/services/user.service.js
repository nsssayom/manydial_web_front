import axios from "axios";
import authHeader from "./auth-header";

class UserService {
    authUser () {
        const header = { 'headers': authHeader(), 'Content-Type': 'application/json' };
        return axios.post(process.env.VUE_APP_API_BASE_URL + '/users/auth', {}, header);
    }

    verifyTwilio () {
        const header = { 'headers': authHeader(), 'Content-Type': 'application/json' };
        return axios.post(process.env.VUE_APP_API_BASE_URL + '/users/auth/self', {}, header);
    }
}
export default new UserService();