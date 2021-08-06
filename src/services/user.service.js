import axios from "axios";
import authHeader from "./auth-header";

class UserService {
    authUser () {
        const header = { 'headers': authHeader(), 'Content-Type': 'application/json' };
        return axios.post('api/users/auth', {}, header);
    }

    verifyTwilio () {
        const header = { 'headers': authHeader(), 'Content-Type': 'application/json' };
        return axios.post('api/users/auth/self', {}, header);
    }
}
export default new UserService();