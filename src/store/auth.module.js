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
                firebaseIDToken: null,
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
                    commit('otpSendSuccess', {
                        "phoneNumber": phoneContext.phoneNumber,
                        "confirmationResult": confirmationResult
                    });
                    return Promise.resolve(confirmationResult);
                },
                error => {
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
                    commit('otpVerifySuccess', verifyResult);
                    return Promise.resolve(verifyResult);
                },
                error => {
                    commit('otpVerifyFailed');
                    return Promise.reject(error);
                },
            );
        },

        getFirebaseIDToken ({ commit }) {
            return FirebaseService.getTokenID().then(idToken => {
                commit('idTokenSuccess', idToken);
                return Promise.resolve(idToken);
            },
                error => {
                    return Promise.reject(error);
                })
        }
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
            state.user.firebaseUserContext = firebaseUserContext;
        },

        otpVerifyFailed (state) {
            state.otpState.otpStatus = "verify_failed";
        },

        idTokenSuccess (state, idToken) {
            state.user.firebaseIDToken = idToken;
        }
    },
};
