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
                country: null,
                countryCode: null,
                countryFlag: null,
                countryFlagEmoji: null,
                timezone: null,
            },
            otpState: {
                inputOtp: null,
                otpStatus: "prompt", // "sent_success" / "sent_failed" / "verify_failed" / "verify_success"
                otpFailedCount: 0,
                confirmationResult: null,
                twilio_verification_code: null,
                twilio_status: "init", // "sent" / "verified" / "not-verified" 
                twilio_tried: false,
            }
        }
    },
    actions: {
        tokenAuth ({ commit }) {
            return userService.authUser().then(
                user => {
                    commit('userAuthSuccess', user);
                    return Promise.resolve(user);
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
        },

        getIpGeoLocation ({ commit }) {
            return userService.getIpGeolocation().then(
                result => {
                    console.log(result);
                    commit('ipGeoLocationSuccess', result.data);
                    return Promise.resolve(result.data);
                },
                error => {
                    console.log(error);
                    commit('ipGeoLocationFailed');
                    return Promise.reject(error);
                }
            )
        },

        verifyTwilio ({ commit }) {
            return userService.verifyTwilio().then(response => {
                commit('twilioValidationCallSuccess', response.data);

                let verifyTrials = 0;
                function verifyCheck () {
                    userService.authUser().then(
                        user => {
                            verifyTrials = verifyTrials + 1;
                            console.log(verifyTrials);

                            // check maximum 20 times 
                            if (verifyTrials > 20) {
                                commit('twilioNotVerified');
                                clearTimeout(timer)
                                return Promise.reject(new Error("Twilio validation failed"));
                            }

                            if (user.data.twilio_verified) {
                                commit('twilioVerified');
                                clearTimeout(timer)
                                return Promise.resolve(user);
                            }

                        },
                        error => {
                            commit('twilioNotVerified');
                            clearTimeout(timer)
                            return Promise.reject(error);
                        }
                    )
                    // Checking every 5 seconds
                    const timer = setTimeout(verifyCheck, 5000);
                }
                return verifyCheck();

                //dispatch('tokenAuth');
                //return Promise.resolve(response);
            },
                error => {
                    console.log(error);
                    commit('twilioValidationCallFailed');
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
            if (user.data.twilio_verified) {
                state.otpState.twilio_status = "verified";
            }
            else {
                state.otpState.twilio_status = "not-verified";
            }
            console.log(user.data);
            state.user.dbUser = user.data;
        },

        userAuthFailed (state) {
            state.otpState.otpStatus = "verify_failed";
            state.user.dbUser = null;
            state.user.firebaseUserContext = null;
            localStorage.removeItem('user');
        },

        twilioValidationCallSuccess (state, twilioResponse) {
            state.otpState.twilio_verification_code = twilioResponse.validationCode;
            console.log('response', twilioResponse);
            state.otpState.twilio_status = "sent";
            console.log("verification call sent");
        },

        twilioValidationCallFailed (state) {
            state.otpState.twilio_verification_code = null;
            state.otpState.twilio_status = "not-verified";
        },

        twilioVerified (state) {
            state.otpState.twilio_status = "verified";
            console.log("verified");
        },

        twilioNotVerified (state) {
            state.otpState.twilio_status = "not-verified";
            state.otpState.twilio_tried = true;
            console.log("not verified");
        },

        ipGeoLocationSuccess (state, result) {
            state.user.country = result["country"];
            state.user.countryCode = result["country_code"];
            state.user.countryFlag = result["flag"]["svg"];
            state.user.countryFlagEmoji = result["flag"]["emoji"];
            state.user.timezone = result["timezone"]["name"];
        },

        ipGeoLocationFailed (state) {
            state.user.country = null;
            state.user.countryCode = null;
            state.user.countryFlag = null;
            state.user.countryFlagEmoji = null;
            state.user.timezone = null;
        },
    },
};
