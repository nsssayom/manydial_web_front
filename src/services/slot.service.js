import axios from "axios";
import authHeader from "./auth-header";

class SlotService {
    getSlots (preffered_start_time, number_of_calls) {
        const header = { 'headers': authHeader(), 'Content-Type': 'application/json' };
        return axios.post(process.env.VUE_APP_API_BASE_URL + '/slots',
            {
                preferred_start_time: preffered_start_time,
                number_of_calls: number_of_calls
            },
            header);
    }
}
export default new SlotService();