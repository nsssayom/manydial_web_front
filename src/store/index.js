import { createStore } from "vuex";
import { auth } from "./auth.module";
import { data } from "./data.module";
/* import createPersistedState from "vuex-persistedstate"; */

const store = createStore({
    modules: {
        auth,
        data
    },
    /* plugins: [createPersistedState()] */
});

export default store;
