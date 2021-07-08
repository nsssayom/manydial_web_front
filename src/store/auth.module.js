import FirebaseService from '../services/firebase.service';

export const auth = {
	namespaced: true,
	state () {
		return {
			user: {
				phoneNumber: null,
				balance: 100,
				id_info: null,
				firebaseUserContext: null,
			},
			token: {
				_token: null,
				_firebaseUUID: null,
				_token_expiry: null
			},
			otpState: {
				inputOtp: null,
				otpStatus: "prompt", // "sent_success" / "sent_failed" / "verify_failed" / "verify_success"
				otpFailedCount: 0,
				confirmationResult: null,
			}
		}
	},
	actions: {
		sendOtp ({ commit }, phoneContext) {
			return FirebaseService.sendOtp(phoneContext.phoneNumber, phoneContext.appVerifier).then(
				confirmationResult => {
					console.log("Action", confirmationResult);
					commit('otpSendSuccess', {
						"phoneNumber": phoneContext.phoneNumber,
						"confirmationResult": confirmationResult
					});
					return Promise.resolve(confirmationResult);
				},
				error => {
					console.log(error);
					commit('otpSendFailed');
					return Promise.reject(error);
				},
			);
		},

		changePhoneNumber ({ commit }) {
			commit('phoneNumberChange');
			return true;
		},

		verifyOtp ({ commit, state }, code) {
			return state.otpState.confirmationResult.confirm(code).then(
				verifyResult => {
					console.log(verifyResult);
					commit('otpVerifySuccess', verifyResult);
					return Promise.resolve(verifyResult);
				},
				error => {
					console.log(error);
					commit('otpVerifyFailed');
					return Promise.reject(error);
				},
			);
		},

	},
	mutations: {
		otpSendSuccess (state, { phoneNumber, confirmationResult }) {
			state.user.phoneNumber = phoneNumber;
			state.otpState.otpStatus = "sent_success";
			state.otpState.confirmationResult = confirmationResult;
		},
		otpSendFailed (state) {
			state.user.phoneNumber = null;
			state.otpState.otpStatus = "sent_failed";
		},
		phoneNumberChange (state) {
			state.user.phoneNumber = null;
			state.otpState.otpStatus = "prompt";
		},

		otpVerifySuccess (state, firebaseUserContext) {
			state.otpState.otpStatus = "verify_success";
			state.otpState.user.firebaseUserContext = firebaseUserContext;
		},

		otpVerifyFailed (state) {
			state.otpState.otpStatus = "verify_failed";
		},
	},
};
