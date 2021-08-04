import FirebaseService from '../services/firebase.service';
import userService from '../services/user.service';

export const auth = {
    namespaced: true,
    state () {
        return {
            user: {
                phoneNumber: null,
                dbUser: null,
                firebaseUserContext: null,
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
        tokenAuth ({ commit }, token) {
            return userService.authUser().then(
                user => {
                    commit('userAuthSuccess', user, token);
                    return Promise.resolve(token);
                },
                error => {
                    commit('userAuthFailed');
                    return Promise.reject(error);
                }
            )
        },

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

        getFirebaseIDToken ({ commit, dispatch }) {
            return FirebaseService.getTokenID().then(idToken => {
                const _user = {
                    token: idToken,
                }
                // Store firebase ID token in local storage
                localStorage.setItem('user', JSON.stringify(_user));

                // Post the firebase ID token to the server
                dispatch('tokenAuth', idToken);
                return Promise.resolve(idToken);
            },
                error => {
                    commit('otpSendFailed');
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

        userAuthSuccess (state, user) {
            state.otpState.otpStatus = "verify_success";
            console.log(user.data);
            state.user.dbUser = user.data;
        },

        userAuthFailed (state) {
            state.otpState.otpStatus = "verify_failed";
            state.user.dbUser = null;
            state.user.firebaseUserContext = null;
            localStorage.removeItem('user');
        }
    },
};
