import orderService from '../services/order.service';
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
            order: null,
            callRateScheme: [
                {
                    name: 'Silver',
                    start: 1,
                    end: 100,
                    rate: 3
                },
                {
                    name: 'Gold',
                    start: 101,
                    end: 1000,
                    rate: 2
                },
                {
                    name: 'Platinum',
                    start: 1001,
                    end: 10000,
                    rate: 1
                },
            ],
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

        setPreferredDate ({ commit }, preferredDate) {
            commit('updatePreferredDate', preferredDate);
        },

        setRecipients ({ commit }, recipients) {
            commit('updateRecipient', recipients);
        },

        setCurrentForm ({ commit }, currentForm) {
            commit('updateCurrentForm', currentForm);
        },

        getSlots ({ commit, state }) {
            console.log('getSlots', state.preferredDate);
            console.log("Preferred Date", state.preferredDate);
            console.log("Recipient Count", state.recipients.length);

            return slotService.getSlots(state.preferredDate,
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

        async placeOrder ({ commit, state }) {

            const audioFile = await fetch(state.audio.audioUrl)
                .then(response => response.blob())
                .then(blob => new File([blob], 'recording.wav', { type: 'audio/wave;codecs=0' }));

            const slotsStr = JSON.stringify(state.slots);
            const recipientStr = state.recipients.toString()

            console.log(slotsStr);
            console.log(recipientStr);

            return orderService.placeOrder(audioFile,
                recipientStr,
                slotsStr)
                .then(response => {
                    console.log(response);
                    commit('orderPlaceSuccess', response);
                    return Promise.resolve(response);
                },
                    error => {
                        console.log(error);
                        commit('orderPlaceFailed', error);
                        return Promise.reject(error);
                    })
        }

    },
    mutations: {

        updateRecordState (state, recordState) {
            state.audio.recordState = recordState;
        },

        updateAudioUrl (state, audioUrl) {
            state.audio.audioUrl = audioUrl;
            new Audio(audioUrl).addEventListener('loadedmetadata', function () {
                if (this.duration &&
                    this.duration !== Infinity)
                    state.audio.audioDuration = Math.ceil(this.duration);
            });
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

        updatePreferredDate (state, preferredDate) {
            state.preferredDate = preferredDate.toISOString();
        },

        updateCurrentForm (state, currentForm) {
            state.currentForm = currentForm;
        },

        updateSlots (state, slots) {
            state.slots = slots.data;
        },

        orderPlaceSuccess (state, order) {
            state.order = order.data;
        },

        orderPlaceFailed (state) {
            state.order = null;
        },
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
