import firebase from "firebase/app";

class FirebaseService {
    // Use firebase service to send OTP to user mobile number
    sendOtp (phoneNumber, appVerifier) {
        return firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message
                // console.log("Firebase success response", confirmationResult);
                // Return confirmationResult object to state
                return confirmationResult;
            })
            .catch((error) => {
                //console.log("Firebase error response", error);
                throw error;
            });
    }
}

export default new FirebaseService();
