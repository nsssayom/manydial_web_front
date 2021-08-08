import axios from "axios";
import authHeader from "./auth-header";

class OrderService {

    placeOrder (file, recipients, slots) {
        const header = { 'headers': authHeader(), 'Content-Type': 'multipart/form-data' };

        var formData = new FormData();
        formData.append("audio", file);
        formData.append("recipients", recipients);
        formData.append("slots", slots);

        return axios.post('api/orders',
            formData,
            header);
    }

    getCalls (orderId) {
        return axios.get(process.env.VUE_APP_API_BASE_URL + '/orders/' + orderId);
    }
}
export default new OrderService();