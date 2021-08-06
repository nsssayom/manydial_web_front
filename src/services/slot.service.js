import axios from "axios";
import authHeader from "./auth-header";

class SlotService {
    getSlots (preffered_start_time, number_of_calls) {
        const header = { 'headers': authHeader(), 'Content-Type': 'application/json' };
        return axios.post('api/slots',
            {
                preferred_start_time: preffered_start_time,
                number_of_calls: number_of_calls
            },
            header);
    }
}
export default new SlotService();