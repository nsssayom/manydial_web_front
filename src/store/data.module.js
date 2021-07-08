export const data = {
	namespaced: true,
	state () {
		return {
			audio: {
				recordState: 'prompt', // 'record_wait' 'record_start', "record_stop", 'record_success', 'record_failed'
				audioUrl: null,
				audioDuration: 0,
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
			state.form = currentForm;
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
