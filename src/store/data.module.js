import slotService from '../services/slot.service';

export const data = {
    namespaced: true,
    state () {
        return {
            audio: {
                recordState: 'prompt', // 'record_wait' 'record_start', "record_stop", 'record_success', 'record_failed'
                audioUrl: null,
                audioDuration: 0,
            },
            recipients: null,
            // Need to convert to ISO String with `toISOString`
            preferredDate: null,
            currentForm: "record", // "record", "invoice"
            slots: null,
        }
    },
    actions: {
        setRecordState ({ commit }, recordState) {
            commit('updateRecordState', recordState);
            if (recordState !== "record_success") {
                commit('updateAudioUrl', null);
            }
            if (recordState === "record_wait") {
                commit('resetAudioDuration');
            }
        },

        setAudioUrl ({ commit }, audioUrl) {
            commit('updateAudioUrl', audioUrl);
        },

        incrementAudioTime ({ commit }) {
            commit('updateAudioDuration');
        },

        setRecipients ({ commit }, recipients) {
            commit('updateRecipient', recipients);
        },

        setCurrentForm ({ commit }, currentForm) {
            commit('updateCurrentForm', currentForm);
        },

        getSlots ({ commit, state }) {
            console.log("Preferred Date", state.preferredDate.toISOString());
            console.log("Recipient Count", state.recipients.length);

            return slotService.getSlots(state.preferredDate.toISOString(),
                state.recipients.length)
                .then(
                    slots => {
                        commit('updateSlots', slots);
                        return Promise.resolve(slots);
                    },
                    error => {
                        console.log(error);
                        return Promise.reject(error);
                    })
        },

    },
    mutations: {

        updateRecordState (state, recordState) {
            state.audio.recordState = recordState;
            //state.audio.audioDuration = audioUrl.duration;
        },

        updateAudioUrl (state, audioUrl) {
            state.audio.audioUrl = audioUrl;
            // TODO: Calculate audio duration
            //state.audio.audioDuration = audioUrl.duration;
        },

        updateAudioDuration (state) {
            state.audio.audioDuration = state.audio.audioDuration + 1;
        },

        resetAudioDuration (state) {
            state.audio.audioDuration = 0;
        },

        updateRecipient (state, recipients) {
            state.recipients = recipients;
        },

        updateCurrentForm (state, currentForm) {
            state.currentForm = currentForm;
        },

        updateSlots (state, slots) {
            state.slots = slots.data;
        }
    },
    getters: {
        recordingTime (state) {
            const raw_seconds = state.audio.audioDuration;
            var mins = Math.floor(raw_seconds / 60).toString();//.padStart(2, '0');
            var secs = (raw_seconds - (mins * 60)).toString().padStart(2, '0');
            return mins + ":" + secs;
        },
    }
};
