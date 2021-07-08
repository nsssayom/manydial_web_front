export const data = {
	namespaced: true,
	state () {
		return {
			audio: {
				recordState: 'prompt', // 'record_wait' 'record_start', "record_stop", 'record_success', 'record_failed'
				audioUrl: null,
				audioDuration: null,
			},
			recipients: [],
			currentForm: "record" // "id", "invoice"
		}
	},
	actions: {
		setRecordState ({ commit }, recordState) {
			commit('updateRecordState', recordState);
			if (recordState !== "record_success") {
				commit('updateAudioUrl', null);
			}
		},

		setAudioUrl ({ commit }, audioUrl) {
			commit('updateAudioUrl', audioUrl);
		},

		setRecipients ({ commit }, recipients) {
			commit('updateRecipient', recipients);
		},

		setCurrentForm ({ commit }, currentForm) {
			commit('updateCurrentForm', currentForm);
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
		updateRecipient (state, recipients) {
			state.recipients = recipients;
		},

		updateCurrentForm (state, currentForm) {
			state.form = currentForm;
		},
	},
};
